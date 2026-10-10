import React from "react";
import CategoryDetail from "../components/CategoryDetail";
import { SeoCategory } from "../data/seoCategories";

interface CategoryPageProps {
  category: SeoCategory;
  activeSubcategorySlug: string | null;
  onNavigateToCategory: (categorySlug: string, subcategorySlug: string | null) => void;
  onNavigateToBlogPost: (slug: string) => void;
  onConsultChatbot: (query: string) => void;
  onBackToHome: () => void;
  allCategories: SeoCategory[];
}

export default function CategoryPage({
  category,
  activeSubcategorySlug,
  onNavigateToCategory,
  onNavigateToBlogPost,
  onConsultChatbot,
  onBackToHome,
  allCategories
}: CategoryPageProps) {
  return (
    <div className="animate-fade-in font-sans w-full">
      <CategoryDetail
        category={category}
        activeSubcategorySlug={activeSubcategorySlug}
        onNavigateToCategory={onNavigateToCategory}
        onNavigateToBlogPost={onNavigateToBlogPost}
        onConsultChatbot={onConsultChatbot}
        onBackToHome={onBackToHome}
        allCategories={allCategories}
      />
    </div>
  );
}
