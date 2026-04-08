import AdminLayout from "../layout/AdminLayout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

/**
 * Placeholder for pages that will be built in later phases.
 */
export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {description ?? "Coming soon in a future phase."}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
