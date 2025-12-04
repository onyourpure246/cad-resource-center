"use client";
import React from "react";
import { contactData } from "@/data/contactData";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
    return (
        <section className="py-12 bg-sidebar">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">
                        ติดต่อเรา
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        หากมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่าง
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.id} className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.detail}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
