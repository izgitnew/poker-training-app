import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { POKER_GLOSSARY, getTermsByCategory, searchTerms, GlossaryTerm } from '@/utils/pokerGlossary';
import { BookOpen, Search, Lightbulb, Target, Users, Zap, Award } from 'lucide-react-native';

export default function GlossaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { key: 'basics', label: 'Basics', color: '#3B82F6', icon: Target },
    { key: 'betting', label: 'Betting', color: '#10B981', icon: Zap },
    { key: 'positions', label: 'Positions', color: '#F59E0B', icon: Users },
    { key: 'hands', label: 'Hands', color: '#EF4444', icon: Award },
    { key: 'strategy', label: 'Strategy', color: '#8B5CF6', icon: Lightbulb }
  ];

  const getFilteredTerms = (): GlossaryTerm[] => {
    if (searchQuery.trim()) {
      return searchTerms(searchQuery);
    }
    if (selectedCategory) {
      return getTermsByCategory(selectedCategory);
    }
    return POKER_GLOSSARY;
  };

  const filteredTerms = getFilteredTerms();

  const renderTerm = ({ item }: { item: GlossaryTerm }) => {
    const category = categories.find(cat => cat.key === item.category);
    const IconComponent = category?.icon || Target;
    
    return (
      <View style={styles.termCard}>
        <View style={styles.termHeader}>
          <View style={styles.termTitleRow}>
            <View style={[styles.termIcon, { backgroundColor: category?.color || '#6B7280' }]}>
              <IconComponent size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.termName}>{item.term}</Text>
          </View>
          <View style={[styles.categoryPill, { backgroundColor: `${category?.color || '#6B7280'}20` }]}>
            <Text style={[styles.categoryPillText, { color: category?.color || '#6B7280' }]}>
              {category?.label || item.category}
            </Text>
          </View>
        </View>
        <Text style={styles.termDefinition}>{item.definition}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.headerIcon}>
            <BookOpen size={24} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.title}>Poker Glossary</Text>
            <Text style={styles.subtitle}>Master the language of poker</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search terms..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === null && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === null && styles.categoryChipTextActive
            ]}>
              All ({POKER_GLOSSARY.length})
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.key;
            const count = getTermsByCategory(category.key).length;
            
            return (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                  isActive && { backgroundColor: category.color }
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <IconComponent 
                  size={16} 
                  color={isActive ? '#FFFFFF' : category.color} 
                />
                <Text style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive
                ]}>
                  {category.label} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in ${categories.find(c => c.key === selectedCategory)?.label}`}
        </Text>
      </View>

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <View style={styles.emptyState}>
          <Search size={48} color="#4B5563" />
          <Text style={styles.emptyTitle}>No terms found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search or browse different categories
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTerms}
          renderItem={renderTerm}
          keyExtractor={(item, index) => `${item.term}-${index}`}
          style={styles.termsList}
          contentContainerStyle={styles.termsListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#F9FAFB',
    marginLeft: 12,
  },
  clearButton: {
    fontSize: 16,
    color: '#6B7280',
    paddingHorizontal: 8,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  termsList: {
    flex: 1,
  },
  termsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  termCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  termTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  termIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  termName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    flex: 1,
  },
  categoryPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  categoryPillText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  termDefinition: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});