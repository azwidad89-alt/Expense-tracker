import React, { useState } from 'react';
import {
Modal,
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
ScrollView,
Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useExpenseStore } from '@/hooks/expense-store';
import { nudeColors } from '@/constants/colors';

interface AddExpenseModalProps {
visible: boolean;
onClose: () => void;
}

export default function AddExpenseModal({ visible, onClose }: AddExpenseModalProps) {
const { categories, addExpense } = useExpenseStore();
const [amount, setAmount] = useState('');
const [description, setDescription] = useState('');
const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
const [showErrorModal, setShowErrorModal] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const handleSubmit = () => {
  if (!amount || !selectedCategoryId) {
    setErrorMessage('Please fill in all required fields');
    setShowErrorModal(true);
    return;
  }

  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    setErrorMessage('Please enter a valid amount');
    setShowErrorModal(true);
    return;
  }
  addExpense({
    amount: numAmount,
    description: description.trim() || 'Expense',
    categoryId: selectedCategoryId,
    date: new Date().toISOString(),
  });

  // Reset form
  setAmount('');
  setDescription('');
  setSelectedCategoryId('');
  onClose();
};

  const handleClose = () => {
  setAmount('');
  setDescription('');
  setSelectedCategoryId('');
  onClose();
};

return (
  <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={handleClose}
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Expense</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color={nudeColors.coffee} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Amount *</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              autoFocus
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textInput}
            value={description}
            onChangeText={setDescription}
            placeholder="What did you spend on?"
            multiline
            numberOfLines={2}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryOption,
                  selectedCategoryId === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategoryId(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                styles.categoryText,
                  selectedCategoryId === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
}
  
