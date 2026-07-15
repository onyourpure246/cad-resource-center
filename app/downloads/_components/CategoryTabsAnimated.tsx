"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CategoryCard from './CategoryCard'
import { Folder, Boxes } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabCategory {
    id: number;
    name: string;
    description?: string;
    group_name?: string;
    mui_icon?: string;
    mui_colour?: string;
}

export default function CategoryTabsAnimated({ categories }: { categories: TabCategory[] }) {
    const [activeTab, setActiveTab] = useState("docs");

    const docCategories = categories?.filter((c: TabCategory) => c.group_name === 'เอกสารต่างๆ' || !c.group_name) || [];
    const scriptCategories = categories?.filter((c: TabCategory) => c.group_name === 'ชุดคำสั่ง') || [];
    const otherCategories = categories?.filter((c: TabCategory) => c.group_name && c.group_name !== 'เอกสารต่างๆ' && c.group_name !== 'ชุดคำสั่ง') || [];

    const SectionHeader = ({ title }: { title: string }) => (
        <h3 className="text-lg font-semibold border-b pb-2 text-primary">{title}</h3>
    );

    const CategoryGrid = ({ data, defaultDesc = 'เลือกดูเอกสารในหมวดหมู่นี้' }: { data: TabCategory[], defaultDesc?: string }) => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {data.map((category: TabCategory) => (
                <CategoryCard
                    key={category.id}
                    title={category.name}
                    description={category.description || defaultDesc}
                    href={`/downloads/category/${category.id}`}
                    icon={<Folder />}
                    mui_icon={category.mui_icon}
                    mui_colour={category.mui_colour || '#1976d2'}
                />
            ))}
        </div>
    );

    const tabsList = [
        { value: "docs", label: "เอกสารต่างๆ" },
        { value: "scripts", label: "ชุดคำสั่ง" }
    ];

    return (
        <div className="w-full">
            {categories && categories.length > 0 ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
                    {/* Header Row: Floating Dock Style Centered */}
                    <TabsList className="inline-flex w-fit mx-auto h-auto p-1.5 bg-background/60 dark:bg-muted/40 backdrop-blur-xl border border-border/60 rounded-full relative shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-2">
                        {tabsList.map((tab) => {
                            const isActive = activeTab === tab.value;
                            return (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        "relative z-10 py-2 px-8 text-[14px] font-medium transition-colors duration-300 rounded-full outline-none data-[state=active]:shadow-none data-[state=active]:bg-transparent",
                                        isActive ? "text-primary-foreground dark:text-black font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-tab-downloads"
                                            className="absolute inset-0 rounded-full bg-primary shadow-sm z-[-1]"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {tab.value === 'docs' ? <Folder className="w-4 h-4" /> : <Boxes className="w-4 h-4" />}
                                        {tab.label}
                                    </span>
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>

                    <TabsContent value="docs" className="space-y-10 mt-0 outline-none w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-10"
                        >
                            {docCategories.length > 0 ? (
                                <div className="space-y-4">
                                    <CategoryGrid data={docCategories} />
                                </div>
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">ไม่มีหมวดหมู่ย่อยในเอกสารต่างๆ</div>
                            )}

                            {otherCategories.length > 0 && (
                                <div className="space-y-4 pt-6 border-t border-dashed">
                                    <SectionHeader title="หมวดหมู่อื่นๆ" />
                                    <CategoryGrid data={otherCategories} defaultDesc="ดาวน์โหลดข้อมูลเพิ่มเติม" />
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="scripts" className="space-y-10 mt-0 outline-none w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-10"
                        >
                            {scriptCategories.length > 0 ? (
                                <div className="space-y-4">
                                    <CategoryGrid data={scriptCategories} defaultDesc="ดาวน์โหลดโปรแกรมและชุดคำสั่ง" />
                                </div>
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">ไม่มีหมวดหมู่ย่อยในชุดคำสั่ง</div>
                            )}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed mt-10 w-full">
                    <p className="text-muted-foreground">ยังไม่มีหมวดหมู่เอกสารในระบบ</p>
                </div>
            )}
        </div>
    )
}
