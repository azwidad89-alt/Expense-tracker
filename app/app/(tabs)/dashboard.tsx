import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
ScrollView,
TouchableOpacity,
} from 'react-native';
import { Plus, TrendingUp, AlertTriangle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExpenseStore } from '@/hooks/expense-store';
import CategoryCard from '@/components/CategoryCard';
import AddExpenseModal from '@/components/AddExpenseModal';
import PieChartComponent from '@/components/PieChart';
import BarChartComponent from '@/components/BarChart';
import { nudeColors } from '@/constants/colors';

export default function DashboardScreen() {
const {
  categorySpending,
  totalMonthlySpending,
  totalMonthlyBudget,
  formatAmount,
  isLoading
} = useExpenseStore();

const insets = useSafeAreaInsets();
const [showAddModal, setShowAddModal] = useState(false);

const getMonthName = () => {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const overBudgetCategories = categorySpending.filter(cs => cs.isOverBudget);
const budgetUtilization = totalMonthlyBudget > 0 ? (totalMonthlySpending / totalMonthlyBudget) * 100 : 0;

if (isLoading) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

return (
  <View style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.monthTitle}>{getMonthName()}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Monthly Overview */}
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <TrendingUp size={24} color={nudeColors.coffee} />
          <Text style={styles.overviewTitle}>Monthly
            Overview</Text>
        </View>
        
        <View style={styles.overviewStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={[styles.statValue, { color: budgetUtilization > 100 ? nudeColors.error : nudeColors.textPrimary }]}>
              {formatAmount(totalMonthlySpending)}
            </Text>
          </View>
          <View style=
            {styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Budget</Text>
            <Text style={styles.statValue}>
              {formatAmount(totalMonthlyBudget)}
            </Text>
          </View>
        </View>

        <View style={styles.budgetProgress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: `${Math.min(100, budgetUtilization)}%`,
                  backgroundColor: budgetUtilization > 100 ? nudeColors.error : budgetUtilization > 80 ? nudeColors.warning : nudeColors.success
                }
              ]} 
            />
          </View>
          <Text style={styles.budgetPercentage}>
            {budgetUtilization.toFixed(0)}% of budget used
          </Text>
          <Text style={styles.remainingBudget}>
            {formatAmount(Math.max(0, totalMonthlyBudget - totalMonthlySpending))} remaining
          </Text>
        </View>
      </View>

      {/* Charts */}
      {categorySpending.some(cs => cs.spent > 0) && (
        <>
          <PieChartComponent categorySpending={categorySpending} />
          <BarChartComponent categorySpending={categorySpending} />
        </>
      )}
      {/* Alerts */}
      {overBudgetCategories.length > 0 && (
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color={nudeColors.error} />
            <Text style={styles.alertTitle}>Budget Alerts</Text>
          </View>
          <Text style={styles.alertText}>
            {overBudgetCategories.length} {overBudgetCategories.length === 1 ? 'category is' : 'categories are'} over budget this month
          </Text>
        </View>
      )}

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {categorySpending.map((categorySpending) => (
          <CategoryCard
            key={categorySpending.category.id}
            categorySpending={categorySpending}
          />
        ))}
      </View>
      <View style={styles.bottomPadding} />
    </ScrollView>

    <AddExpenseModal
      visible={showAddModal}
      onClose={() => setShowAddModal(false)}
    />
  </View>
);
}
