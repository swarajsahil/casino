"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
} from "./ui/card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./ui/toggle-group"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select"

// Dummy dataset (should be fetched from backend)
const data = {
  "7d": [
    { category: "Casinos", count: 5 },
    { category: "Blogs", count: 7 },
    { category: "Reviews", count: 9 },
    { category: "Games", count: 6 },
  ],
  "90d": [
    { category: "Casinos", count: 55 },
    { category: "Blogs", count: 60 },
    { category: "Reviews", count: 72 },
    { category: "Games", count: 50 },
  ],
  "365d": [
    { category: "Casinos", count: 200 },
    { category: "Blogs", count: 220 },
    { category: "Reviews", count: 250 },
    { category: "Games", count: 180 },
  ],
}

export function ChartAreaInteractive()  {
  const [range, setRange] = React.useState("90d")

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Uploads by Category</CardTitle>
        <CardDescription>Data over selected range</CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(val) => val && setRange(val)}
            className="hidden @[767px]/card:flex">
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
            <ToggleGroupItem value="90d">3 months</ToggleGroupItem>
            <ToggleGroupItem value="365d">1 year</ToggleGroupItem>
          </ToggleGroup>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-36 @[767px]/card:hidden">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="90d">3 months</SelectItem>
              <SelectItem value="365d">1 year</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[range]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}