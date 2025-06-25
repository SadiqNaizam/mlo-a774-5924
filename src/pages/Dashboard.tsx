import React from "react";
import { addDays, format } from "date-fns";
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  Users,
  Calendar as CalendarIcon,
  BarChart,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
} from "recharts";
import { Link } from "react-router-dom";

// Custom Components
import Header from "@/components/layout/Header";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Footer from "@/components/layout/Footer";
import MetricCard from "@/components/MetricCard";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Placeholder data
const salesData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7500 },
];

const topProductsData = [
    { name: "Laptop Pro", sales: 150 },
    { name: "Wireless Mouse", sales: 300 },
    { name: "Mechanical Keyboard", sales: 220 },
    { name: "4K Monitor", sales: 180 },
    { name: "Webcam HD", sales: 250 },
];

const recentOrders = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    type: "Subscription",
    status: "Pending",
    date: "2023-06-26",
    amount: "$450.00",
  },
];

const Dashboard = () => {
  console.log("Dashboard page loaded");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return "default"; // green-like in some themes
      case "Pending":
        return "secondary"; // yellow-like
      case "Declined":
        return "destructive"; // red
      default:
        return "outline";
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Metric Cards */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              icon={DollarSign}
              trendText="+20.1% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Subscriptions"
              value="+2350"
              icon={Users}
              trendText="+180.1% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Sales"
              value="+12,234"
              icon={CreditCard}
              trendText="+19% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Orders"
              value="573"
              icon={ShoppingCart}
              trendText="+2 from yesterday"
              trendDirection="neutral"
            />
          </section>

          {/* Charts */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Statistics</CardTitle>
                <CardDescription>
                  Revenue overview for the last 6 months.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>
                  Current leaders in product sales.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={topProductsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={120} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          {/* Recent Orders Table */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  An overview of your most recent sales.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{order.name}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{order.type}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
               <CardFooter>
                 <div className="text-xs text-muted-foreground">
                    Showing <strong>{recentOrders.length}</strong> of the most recent orders.
                    <Link to="/orders" className="ml-2 text-primary hover:underline">View All Orders</Link>
                 </div>
               </CardFooter>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;