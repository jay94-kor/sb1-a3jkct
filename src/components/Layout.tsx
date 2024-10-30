import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  const navigation = [
    { name: '대시보드', href: '/' },
    { name: '프로젝트 관리', href: '/projects' },
    { name: 'PO 발행', href: '/po' },
    { name: '예산 관리', href: '/budget' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <h1 className="text-xl font-semibold">프로젝트 관리</h1>
        </div>
        <nav className="p-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`
                block px-4 py-2 rounded-md mb-1
                ${location.pathname === item.href
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}