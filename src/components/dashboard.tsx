import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addDays, format } from 'date-fns'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Simulação de dados (mantida como estava)
const financialData = {
  "Safra 2023/2024": {
    income: 500000,
    expenses: 300000,
    expensesByCategory: [
      { name: 'Combustível', value: 100000 },
      { name: 'Manutenção', value: 80000 },
      { name: 'Salários', value: 120000 },
    ],
    aircraftReports: [
      { name: 'PT-XYZ', flightHours: 120, revenue: 200000, expenses: 150000 },
      { name: 'PR-ABC', flightHours: 100, revenue: 180000, expenses: 130000 },
    ],
    detailedExpenses: [
      { date: '2023-07-01', type: 'Aeronaves', value: 50000 },
      { date: '2023-07-15', type: 'Específicas', value: 30000 },
      { date: '2023-08-01', type: 'Veículos', value: 20000 },
      { date: '2023-08-15', type: 'Comissões', value: 40000 },
      { date: '2023-09-01', type: 'Aeronaves', value: 60000 },
      { date: '2023-09-15', type: 'Específicas', value: 25000 },
      { date: '2023-10-01', type: 'Veículos', value: 15000 },
      { date: '2023-10-15', type: 'Comissões', value: 35000 },
    ]
  },
  "Safra 2022/2023": {
    income: 450000,
    expenses: 280000,
    expensesByCategory: [
      { name: 'Combustível', value: 90000 },
      { name: 'Manutenção', value: 70000 },
      { name: 'Salários', value: 120000 },
    ],
    aircraftReports: [
      { name: 'PT-XYZ', flightHours: 110, revenue: 180000, expenses: 140000 },
      { name: 'PR-ABC', flightHours: 90, revenue: 160000, expenses: 120000 },
    ],
    detailedExpenses: [
      { date: '2024-07-01', type: 'Aeronaves', value: 45000 },
      { date: '2024-07-15', type: 'Específicas', value: 28000 },
      { date: '2024-08-01', type: 'Veículos', value: 18000 },
      { date: '2024-08-15', type: 'Comissões', value: 38000 },
      { date: '2024-09-01', type: 'Aeronaves', value: 55000 },
      { date: '2024-09-15', type: 'Específicas', value: 22000 },
      { date: '2024-10-01', type: 'Veículos', value: 14000 },
      { date: '2024-10-15', type: 'Comissões', value: 32000 },
    ]
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const expenseTypes = ['Aeronaves', 'Específicas', 'Veículos', 'Comissões']

export function DashboardPage() {
  const [activeHarvest, setActiveHarvest] = useState("Safra 2023/2024")
  const [dateRange, setDateRange] = useState({ from: addDays(new Date(), -30), to: new Date() })
  const [selectedExpenseTypes, setSelectedExpenseTypes] = useState(expenseTypes)
  const [isFinancialSummaryOpen, setIsFinancialSummaryOpen] = useState(false)
  const [isExpenseCategoriesOpen, setIsExpenseCategoriesOpen] = useState(false)
  const [isAircraftReportOpen, setIsAircraftReportOpen] = useState(false)
  const [isDetailedExpensesOpen, setIsDetailedExpensesOpen] = useState(false)

  const data = financialData[activeHarvest]

  const filteredExpenses = useMemo(() => {
    return data.detailedExpenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate >= dateRange.from &&
        expenseDate <= dateRange.to &&
        selectedExpenseTypes.includes(expense.type)
      )
    })
  }, [data.detailedExpenses, dateRange, selectedExpenseTypes])

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((total, expense) => total + expense.value, 0)
  }, [filteredExpenses])

  const expensesByType = useMemo(() => {
    return filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.type]) {
        acc[expense.type] = 0
      }
      acc[expense.type] += expense.value
      return acc
    }, {})
  }, [filteredExpenses])

  const handleExpenseTypeToggle = (type) => {
    setSelectedExpenseTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
    <div className="p-6 bg-[#4B5320] rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Estatística</h2>
        <Select value={activeHarvest} onValueChange={setActiveHarvest}>
          <SelectTrigger className="w-[180px] text-white">
            <SelectValue placeholder="Selecione a safra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Safra 2023/2024">Safra 2023/2024</SelectItem>
            <SelectItem value="Safra 2022/2023">Safra 2022/2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Collapsible open={isFinancialSummaryOpen} onOpenChange={setIsFinancialSummaryOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex justify-between w-full">
              <span>Resumo Financeiro</span>
              {isFinancialSummaryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4">
                <p>Receita: R$ {data.income.toLocaleString()}</p>
                <p>Despesas: R$ {data.expenses.toLocaleString()}</p>
                <p>Lucro: R$ {(data.income - data.expenses).toLocaleString()}</p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isExpenseCategoriesOpen} onOpenChange={setIsExpenseCategoriesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex justify-between w-full">
              <span>Despesas por Categoria</span>
              {isExpenseCategoriesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isAircraftReportOpen} onOpenChange={setIsAircraftReportOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex justify-between w-full">
              <span>Relatório de Aeronaves</span>
              {isAircraftReportOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.aircraftReports}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="flightHours" fill="#8884d8" name="Horas de Voo" />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Receita" />
                    <Bar dataKey="expenses" fill="#ffc658" name="Despesas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isDetailedExpensesOpen} onOpenChange={setIsDetailedExpensesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex justify-between w-full">
              <span>Despesas Detalhadas</span>
              {isDetailedExpensesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="date-range" className="text-[#11428C]">Período</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-range"
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal border-[#FC862D] focus:ring-[#FC862D]"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#FC862D]" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                              </>
                            ) : (
                              format(dateRange.from, "dd/MM/yyyy")
                            )
                          ) : (
                            <span>Selecione um período</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={dateRange}
                          onSelect={(range) => range && setDateRange({ from: range.from || dateRange.from, to: range.to || dateRange.to })}
                          numberOfMonths={2}
                          className="border-[#FC862D]"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {expenseTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedExpenseTypes.includes(type)}
                          onCheckedChange={() => handleExpenseTypeToggle(type)}
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Total de Despesas: R$ {totalExpenses.toLocaleString()}</h3>
                    <ul>
                      {Object.entries(expensesByType).map(([type, value]) => (
                        <li key={type}>{type}: R$ {value.toLocaleString()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}