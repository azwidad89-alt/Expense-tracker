import createContextHook from '@nkzw/create-context-hook';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { Category, Expense, CategorySpending, AppSettings } from '@/types/expense';
import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { DEFAULT_CURRENCY } from '@/constants/currencies';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEYS = {
EXPENSES: 'expenses',
CATEGORIES: 'categories',
SETTINGS: 'settings'
};

const DEFAULT_SETTINGS: AppSettings = {
currency: DEFAULT_CURRENCY.code,
monthlyBudget: 2000
};

export const [ExpenseProvider, useExpenseStore] = createContextHook(() => {
const queryClient = useQueryClient();
  // Load expenses
const expensesQuery = useQuery({
  queryKey: ['expenses'],
  queryFn: async (): Promise<Expense[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
    return stored ? JSON.parse(stored) : [];
  }
});
  // Load categories
const categoriesQuery = useQuery({
  queryKey: ['categories'],
  queryFn: async (): Promise<Category[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
  }
}); 
// Load settings
const settingsQuery = useQuery({
  queryKey: ['settings'],
  queryFn: async (): Promise<AppSettings> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  }
});
// Mutations pour sauvegarder les données
const saveExpensesMutation = useMutation({
  mutationFn: async (expenses: Expense[]) => {
    if (!Array.isArray(expenses)) return [];
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    return expenses;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['expenses'] });
  }
});
// ... autres mutations et fonctions utilitaires

// Format amount without currency
const formatAmount = useCallback((amount: number) => {
  return amount.toFixed(2);
}, []);
return useMemo(() => ({
  expenses,
  categories,
  settings,
  currentMonthExpenses,
  categorySpending,
  totalMonthlySpending,
  totalMonthlyBudget,
  totalCategoryBudgets,
  addExpense,
  updateCategoryBudget,
  addCategory,
  updateCategory,
  deleteCategory,
  updateSettings,
  formatAmount,
  isLoading:
expensesQuery.isLoading || categoriesQuery.isLoading || settingsQuery.isLoading
}), [
  // ... dépendances
]);
});
                                                                    
