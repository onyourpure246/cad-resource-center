"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CategoryCard from './CategoryCard'
import { Folder } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CategoryTabsAnimated({ categories }: { categories: any[] }) {
    const [activeTab, setActiveTab] = useState("all");

    const docCategories = categories?.filter((c: any) => c.group_name === 'เอกสารต่างๆ' || !c.group_name) || [];
    const scriptCategories = categories?.filter((c: any) => c.group_name === 'ชุดคำสั่ง') || [];
    const otherCategories = categories?.filter((c: any) => c.group_name && c.group_name !== 'เอกสารต่างๆ' && c.group_name !== 'ชุดคำสั่ง') || [];

    const SectionHeader = ({ title }: { title: string }) => (
        <h3 className="text-lg font-semibold border-b pb-2 text-primary">{title}</h3>
    );

    const CategoryGrid = ({ data, defaultDesc = 'ดาวน์โหลดเอกสารในหมวดหมู่นี้' }: { data: any[], defaultDesc?: string }) => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {data.map((category: any) => (
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
        { value: "all", label: "ทั้งหมด" },
        { value: "docs", label: "เอกสารต่างๆ" },
        { value: "scripts", label: "ชุดคำสั่ง" }
    ];

    return (
        <div className="w-full mt-2">
            {categories && categories.length > 0 ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-5 w-full max-w-md mx-auto grid grid-cols-3 h-auto p-1.5 bg-muted/60 rounded-xl relative overflow-hidden">
                        {tabsList.map((tab) => {
                            const isActive = activeTab === tab.value;
                            return (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        "relative z-10 py-2.5 text-sm sm:text-base transition-none data-[state=active]:shadow-none data-[state=active]:bg-transparent outline-none",
                                        isActive ? "text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-tab-downloads"
                                            className="absolute inset-0 rounded-lg bg-primary z-[-1]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>

                    <TabsContent value="all" className="space-y-10 mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-10"
                        >
                            {docCategories.length > 0 && (
                                <div className="space-y-4">
                                    <SectionHeader title="เอกสารต่างๆ" />
                                    <CategoryGrid data={docCategories} />
                                </div>
                            )}

                            {scriptCategories.length > 0 && (
                                <div className="space-y-4">
                                    <SectionHeader title="ชุดคำสั่ง" />
                                    <CategoryGrid data={scriptCategories} defaultDesc="ดาวน์โหลดโปรแกรมและชุดคำสั่ง" />
                                </div>
                            )}

                            {otherCategories.length > 0 && (
                                <div className="space-y-4">
                                    <SectionHeader title="หมวดหมู่อื่นๆ" />
                                    <CategoryGrid data={otherCategories} defaultDesc="ดาวน์โหลดข้อมูลเพิ่มเติม" />
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="docs" className="space-y-10 mt-0 outline-none">
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

                    <TabsContent value="scripts" className="space-y-10 mt-0 outline-none">
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
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed mt-10">
                    <p className="text-muted-foreground">ยังไม่มีหมวดหมู่เอกสารในระบบ</p>
                </div>
            )}
        </div>
    )
}
