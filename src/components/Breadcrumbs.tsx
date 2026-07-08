import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { SeoCategory } from "../data/seoCategories";

interface BreadcrumbsProps {
  currentRoute: string;
  mainTab: string;
  selectedCity: string | null;
  selectedProcedure: any | null;
  selectedPost: any | null;
  selectedCategory: SeoCategory | null;
  selectedSubcategorySlug: string | null;
  onNavigateHome: () => void;
  onNavigateTab: (tab: string) => void;
  onNavigateCategory: (categorySlug: string, subcategorySlug?: string | null) => void;
  onClearProcedure: () => void;
  onClearPost: () => void;
  onClearCity: () => void;
}

export default function Breadcrumbs({
  currentRoute,
  mainTab,
  selectedCity,
  selectedProcedure,
  selectedPost,
  selectedCategory,
  selectedSubcategorySlug,
  onNavigateHome,
  onNavigateTab,
  onNavigateCategory,
  onClearProcedure,
  onClearPost,
  onClearCity
}: BreadcrumbsProps) {

  const activeSubcategory = selectedCategory?.subcategories.find(
    (sub) => sub.slug === selectedSubcategorySlug
  );

  // Generate structured schema
  const getCrumbs = () => {
    const crumbs = [{ label: "Inicio", onClick: onNavigateHome, isLast: false }];

    if (selectedCategory) {
      crumbs.push({
        label: selectedCategory.title,
        onClick: () => onNavigateCategory(selectedCategory.slug, null),
        isLast: !selectedSubcategorySlug
      });

      if (activeSubcategory) {
        crumbs.push({
          label: activeSubcategory.title,
          onClick: () => onNavigateCategory(selectedCategory.slug, activeSubcategory.slug),
          isLast: true
        });
      }
    } else if (selectedProcedure) {
      crumbs.push({
        label: "Trámites",
        onClick: () => onNavigateTab("consultas"),
        isLast: false
      });
      crumbs.push({
        label: selectedProcedure.title,
        onClick: () => {},
        isLast: true
      });
    } else if (selectedPost) {
      crumbs.push({
        label: "Blog",
        onClick: () => onNavigateTab("blog"),
        isLast: false
      });
      crumbs.push({
        label: selectedPost.title,
        onClick: () => {},
        isLast: true
      });
    } else if (selectedCity) {
      crumbs.push({
        label: "Ciudades",
        onClick: onClearCity,
        isLast: false
      });
      crumbs.push({
        label: `IESS ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`,
        onClick: () => {},
        isLast: true
      });
    } else if (mainTab === "oficios") {
      crumbs.push({
        label: "Formatos y Oficios de Ley",
        onClick: () => {},
        isLast: true
      });
    } else if (currentRoute === "faq") {
      crumbs.push({
        label: "Preguntas Frecuentes",
        onClick: () => {},
        isLast: true
      });
    } else if (mainTab === "blog") {
      crumbs.push({
        label: "Blog de Guías SEO",
        onClick: () => {},
        isLast: true
      });
    } else {
      crumbs.push({
        label: "Consultas y Chatbot",
        onClick: () => {},
        isLast: true
      });
    }

    // Ensure the last crumb is marked as isLast
    if (crumbs.length > 1) {
      crumbs[crumbs.length - 1].isLast = true;
    }

    return crumbs;
  };

  const crumbs = getCrumbs();

  // JSON-LD structured data for Google crawler
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": typeof window !== "undefined" ? window.location.origin : "https://iessasistente.com"
    }))
  };

  return (
    <div className="bg-slate-50 border-y border-slate-200/60 py-2.5 px-4 mb-6 select-none">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <nav className="max-w-5xl w-full mx-auto flex items-center flex-wrap gap-1.5 text-xs font-semibold text-slate-500">
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
            
            {crumb.isLast ? (
              <span className="text-[#0a1f42] font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={crumb.onClick}
                className="hover:text-[#0a1f42] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {idx === 0 && <Home className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />}
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
