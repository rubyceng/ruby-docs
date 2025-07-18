<template>
  <div class="github-contribution-chart">
    <div class="chart-header">
      <h3 class="chart-title">
        {{ totalContributions }} contributions in the last 9 months
      </h3>
      <div class="chart-controls">
        <button
          v-for="year in availableYears"
          :key="year"
          @click="selectedYear = year"
          :class="{ active: selectedYear === year }"
          class="year-button"
        >
          {{ year }}
        </button>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-content">
        <div class="chart-sidebar">
          <div class="sidebar-spacer"></div>
          <div class="chart-weekdays">
            <span class="weekday-label">Mon</span>
            <span class="weekday-label">Wed</span>
            <span class="weekday-label">Fri</span>
          </div>
        </div>

        <div class="chart-main">
          <div class="chart-months">
            <span
              v-for="month in monthsWithPosition"
              :key="month.name"
              :style="{ left: month.position + 'px' }"
              class="month-label"
            >
              {{ month.name }}
            </span>
          </div>

          <div class="chart-weeks">
            <div
              v-for="week in weeks"
              :key="week.weekStart"
              class="week-column"
            >
              <div
                v-for="day in week.days"
                :key="day.date"
                :class="getContributionClass(day.count)"
                :title="`${day.count} contributions on ${formatDate(day.date)}`"
                class="contribution-day"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-legend">
        <span class="legend-text">Less</span>
        <div class="legend-colors">
          <div class="legend-color level-0"></div>
          <div class="legend-color level-1"></div>
          <div class="legend-color level-2"></div>
          <div class="legend-color level-3"></div>
          <div class="legend-color level-4"></div>
        </div>
        <span class="legend-text">More</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  contributions: {
    type: Object,
    default: () => ({}),
  },
});

const selectedYear = ref(2025);
const availableYears = ref([2025]);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// 计算总贡献数
const totalContributions = computed(() => {
  return Object.values(props.contributions).reduce(
    (sum, count) => sum + count,
    0
  );
});

// 生成最近9个月的日期网格
const weeks = computed(() => {
  const weeksData = [];
  const now = new Date();

  // 计算9个月前的日期
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 9);

  // 找到开始日期的周一
  const startDate = new Date(sixMonthsAgo);
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - (startDay === 0 ? 9 : startDay - 1));

  let currentDate = new Date(startDate);

  while (currentDate <= now) {
    const week = {
      weekStart: new Date(currentDate),
      days: [],
    };

    // 一周7天
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(currentDate);
      const dateKey = dayDate.toISOString().split("T")[0];

      week.days.push({
        date: new Date(dayDate),
        count: props.contributions[dateKey] || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeksData.push(week);
  }

  return weeksData;
});

// 计算月份标签的位置
const monthsWithPosition = computed(() => {
  if (weeks.value.length === 0) return [];

  const monthPositions = [];
  let currentMonth = -1;
  const cellWidth = 14; // 11px + 3px gap

  weeks.value.forEach((week, weekIndex) => {
    const firstDay = week.days[0];
    const month = firstDay.date.getMonth();

    if (month !== currentMonth) {
      currentMonth = month;
      monthPositions.push({
        name: months[month],
        position: weekIndex * cellWidth,
        weekIndex,
      });
    }
  });

  return monthPositions;
});

// 根据贡献数量获取CSS类
const getContributionClass = (count) => {
  if (count === 0) return "level-0";
  if (count <= 3) return "level-1";
  if (count <= 6) return "level-2";
  if (count <= 9) return "level-3";
  return "level-4";
};

// 格式化日期
const formatDate = (date) => {
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(() => {
  // 只显示2025年
  availableYears.value = [2025];
});
</script>

<style scoped>
.github-contribution-chart {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-title {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.chart-controls {
  display: flex;
  gap: 8px;
}

.year-button {
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.year-button:hover {
  background: var(--vp-c-bg-mute);
}

.year-button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.chart-container {
  font-size: 12px;
}

.chart-content {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.chart-sidebar {
  display: flex;
  flex-direction: column;
  width: 30px;
  flex-shrink: 0;
}

.sidebar-spacer {
  height: 20px;
}

.chart-weekdays {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-end;
}

.weekday-label {
  height: 11px;
  font-size: 10px;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 1;
}

.chart-main {
  flex: 1;
  overflow-x: auto;
}

.chart-months {
  position: relative;
  height: 20px;
  margin-bottom: 8px;
}

.month-label {
  position: absolute;
  top: 0;
  font-size: 11px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.chart-weeks {
  display: flex;
  gap: 3px;
}

.week-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex-shrink: 0;
}

.contribution-day {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contribution-day:hover {
  transform: scale(1.2);
  border: 1px solid var(--vp-c-text-3);
}

.level-0 {
  background-color: var(--vp-c-bg-mute);
}

.level-1 {
  background-color: #0e4429;
}

.level-2 {
  background-color: #006d32;
}

.level-3 {
  background-color: #26a641;
}

.level-4 {
  background-color: #39d353;
}

.chart-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.legend-text {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.legend-colors {
  display: flex;
  gap: 3px;
}

.legend-color {
  width: 11px;
  height: 11px;
  border-radius: 2px;
}

.legend-color.level-0 {
  background-color: var(--vp-c-bg-mute);
}

.legend-color.level-1 {
  background-color: #0e4429;
}

.legend-color.level-2 {
  background-color: #006d32;
}

.legend-color.level-3 {
  background-color: #26a641;
}

.legend-color.level-4 {
  background-color: #39d353;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .chart-sidebar {
    width: 24px;
  }

  .sidebar-spacer {
    height: 16px;
  }

  .weekday-label {
    height: 9px;
    font-size: 9px;
  }

  .month-label {
    font-size: 10px;
  }

  .contribution-day {
    width: 9px;
    height: 9px;
  }

  .legend-color {
    width: 9px;
    height: 9px;
  }

  .chart-weeks {
    gap: 2px;
  }

  .week-column {
    gap: 2px;
  }
}

@media (max-width: 480px) {
  .github-contribution-chart {
    padding: 16px;
  }

  .chart-sidebar {
    width: 20px;
  }

  .month-label {
    font-size: 9px;
  }

  .contribution-day {
    width: 8px;
    height: 8px;
  }

  .legend-color {
    width: 8px;
    height: 8px;
  }
}
</style>
