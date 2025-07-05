"use client";

import { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SidebarContent from './SidebarContent';

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    // ★ ルートを <div className="drawer"> にする
    <div className="drawer">
      
      {/* 非表示のチェックボックスがDrawerの状態をDOM上で管理 */}
      <input 
        id="my-drawer" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isOpen}
        onChange={handleToggle} // ReactのStateと同期させる
      />

      {/* ページ本体のコンテンツ */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        {/* Headerは、中のlabelがcheckboxを操作してくれる */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div> 

      {/* サイドバーの中身 */}
      <div className="drawer-side z-50">
        {/* オーバーレイ（クリックで閉じるためのlabel） */}
        <label 
          htmlFor="my-drawer" 
          aria-label="close sidebar" 
          className="drawer-overlay"
        ></label> 
        {/* ★ SidebarContentをここに配置 */}
        <SidebarContent onLinkClick={closeDrawer} />
      </div>

    </div>
  );
}