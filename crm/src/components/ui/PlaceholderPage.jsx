import AdminLayout from '../../components/layout/AdminLayout';

/**
 * Placeholder for pages that will be built in later phases.
 */
export default function PlaceholderPage({ title, description }) {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500">{description || 'Coming soon in a future phase.'}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
