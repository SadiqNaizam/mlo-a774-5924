import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ReportsPage = () => {
    console.log('ReportsPage loaded');
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const handleGenerateReport = () => {
        // In a real app, you would use form state to generate and display a report.
        console.log("Generating report with the following settings:", { date });
        alert("Report generation initiated. Check the console for details.");
    };

    return (
        <div className="flex min-h-screen w-full bg-background">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4 sm:p-6 bg-muted/40">
                    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
                        <div>
                            <h1 className="text-3xl font-bold">Reports</h1>
                            <p className="text-muted-foreground">Configure and generate your custom reports.</p>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Report</CardTitle>
                                <CardDescription>Fill out the form below to generate a new report.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="report-type">Report Type</Label>
                                        <Select>
                                            <SelectTrigger id="report-type" aria-label="Select report type">
                                                <SelectValue placeholder="Select a report type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sales">Sales Report</SelectItem>
                                                <SelectItem value="customers">Customer Activity Report</SelectItem>
                                                <SelectItem value="products">Top Selling Products</SelectItem>
                                                <SelectItem value="inventory">Inventory Summary</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="date-range">Date Range</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date-range"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "LLL dd, yyyy")} -{" "}
                                                                {format(date.to, "LLL dd, yyyy")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "LLL dd, yyyy")
                                                        )
                                                    ) : (
                                                        <span>Pick a date range</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                     <div className="grid gap-3">
                                        <Label htmlFor="export-format">Export Format</Label>
                                        <Select defaultValue="csv">
                                            <SelectTrigger id="export-format" aria-label="Select export format">
                                                <SelectValue placeholder="Select an export format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="csv">CSV</SelectItem>
                                                <SelectItem value="pdf">PDF</SelectItem>
                                                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button variant="outline" type="reset">Reset</Button>
                                        <Button type="button" onClick={handleGenerateReport}>Generate Report</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default ReportsPage;