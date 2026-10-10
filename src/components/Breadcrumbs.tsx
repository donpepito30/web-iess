import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { SeoCategory } from "../data/seoCategories";
import { Link } from "./Link";
import { urlProcedure, urlBlogPost, urlCategory, urlCity } from "../lib/routes";
import { getSiteUrl } from "../config/site";

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

  // Generate breadcrumb items with label and crawleable URL
  const getCrumbs = () => {
    const crumbs = [{ label: "Inicio", to: "/", isLast: false }];

    if (selectedCategory) {
      crumbs.push({
        label: selectedCategory.title,
        to: urlCategory(selectedCategory.slug),
        isLast: !selectedSubcategorySlug
      });

      if (activeSubcategory) {
        crumbs.push({
          label: activeSubcategory.title,
          to: urlCategory(selectedCategory.slug, activeSubcategory.slug),
          isLast: true
        });
      }
    } else if (selectedProcedure) {
      crumbs.push({
        label: "Trámites",
        to: "/",
        isLast: false
      });
      crumbs.push({
        label: selectedProcedure.title,
        to: urlProcedure(selectedProcedure.id),
        isLast: true
      });
    } else if (selectedPost) {
      crumbs.push({
        label: "Blog",
        to: "/blog",
        isLast: false
      });
      crumbs.push({
        label: selectedPost.title,
        to: urlBlogPost(selectedPost.slug),
        isLast: true
      });
    } else if (selectedCity === 'directory') {
      crumbs.push({
        label: "Ciudades",
        to: "/iess",
        isLast: true
      });
    } else if (selectedCity) {
      crumbs.push({
        label: "Ciudades",
        to: "/iess",
        isLast: false
      });
      crumbs.push({
        label: `IESS ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`,
        to: urlCity(selectedCity),
        isLast: true
      });
    } else if (mainTab === "oficios") {
      crumbs.push({
        label: "Formatos y Oficios de Ley",
        to: "/oficios",
        isLast: true
      });
    } else if (currentRoute === "faq") {
      crumbs.push({
        label: "Preguntas Frecuentes",
        to: "/faq",
        isLast: true
      });
    } else if (mainTab === "blog") {
      crumbs.push({
        label: "Blog de Guías Prácticas",
        to: "/blog",
        isLast: true
      });
    } else {
      crumbs.push({
        label: "Consultas y Chatbot",
        to: "/",
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
  const siteUrl = getSiteUrl();

  // JSON-LD structured data with actual exact sub-urls for perfect search engine indexation
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `${siteUrl}${crumb.to}`
    }))
  };

  return (
    <div className="bg-slate-50 border-y border-slate-200/60 py-2.5 px-4 mb-6 select-none">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <nav aria-label="Migas de pan" className="max-w-5xl w-full mx-auto flex items-center flex-wrap gap-1.5 text-xs font-semibold text-slate-500">
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
            
            {crumb.isLast ? (
              <span className="text-[#0a1f42] font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-md" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="hover:text-[#0a1f42] flex items-center gap-1 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f42] rounded-md px-1 py-0.5"
              >
                {idx === 0 && <Home className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />}
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
