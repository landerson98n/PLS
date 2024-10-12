'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addDays, format } from 'date-fns'
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

// Simulated data (you would replace this with actual data fetching logic)
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
  const [selectedPilot, setSelectedPilot] = useState("")
  const [selectedAircraft, setSelectedAircraft] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(addDays(new Date(), -30))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [selectedExpenseTypes, setSelectedExpenseTypes] = useState(expenseTypes)

  const data = financialData[activeHarvest]

  const filteredExpenses = useMemo(() => {
    return data.detailedExpenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return (
        (!startDate || expenseDate >= startDate) &&
        (!endDate || expenseDate <= endDate) &&
        selectedExpenseTypes.includes(expense.type)
      )
    })
  }, [data.detailedExpenses, startDate, endDate, selectedExpenseTypes])

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
    }, {} as Record<string, number>)
  }, [filteredExpenses])

  const handleExpenseTypeToggle = (type: string) => {
    setSelectedExpenseTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const generateAircraftReport = () => {
    // This is where you would typically fetch data from an API
    // For now, we'll return a mock report
    return {
      nome_aeronave: selectedAircraft || "Nenhum serviço encontrado para essa aeronave nas datas especificadas.",
      total_de_area_aplicada_em_hectares: 1000,
      total_de_area_aplicada_em_alqueires: 413.22,
      valor_total_bruto_recebido: 200000,
      valor_medio_de_hectares_total: 200,
      valor_medio_de_alqueires_total: 484.11,
      total_de_horas_voadas: 50,
      valor_medio_por_hora_de_voo_total: 4000,
      lucro_total: 100000,
      total_gasto_combustivel: 30000,
      total_gasto_oleo: 5000,
      comissoes_de_pilotos: 20000,
      comissoes_de_badeco: 10000,
      restante_das_despesas: 15000,
      despesas_de_veiculo: 10000,
      despesas_de_especificas: 10000
    }
  }

  const aircraftReport = useMemo(generateAircraftReport, [selectedAircraft, startDate, endDate])

  return (
    <div className="p-6 bg-[#4B5320] rounded-lg shadow text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">Estatística</h2>
        <div className="space-y-2 w-full md:w-auto">
          <Select value={selectedPilot} onValueChange={setSelectedPilot}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Selecione o piloto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piloto1">Piloto 1</SelectItem>
              <SelectItem value="piloto2">Piloto 2</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Selecione a aeronave" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PT-XYZ">PT-XYZ</SelectItem>
              <SelectItem value="PR-ABC">PR-ABC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-[#556B2F] text-white">
          <CardHeader>
            <CardTitle>Relatório de Aeronave</CardTitle>
          </CardHeader>

          <div className="flex flex-col mb-5 ml-6 md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-[50%]">
            <div className="flex-1">
              <Label htmlFor="start-date">Data Inicial</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal text-black"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Label htmlFor="end-date">Data Final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal text-black"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <CardContent>
            <div className="space-y-2">
              <p>Nome da Aeronave: {aircraftReport.nome_aeronave}</p>
              <p>Total de Área Aplicada (Hectares): {aircraftReport.total_de_area_aplicada_em_hectares}</p>
              <p>Total de Área Aplicada (Alqueires): {aircraftReport.total_de_area_aplicada_em_alqueires}</p>
              <p>Valor Total Bruto Recebido: R$ {aircraftReport.valor_total_bruto_recebido.toLocaleString()}</p>
              <p>Valor Médio de Hectares Total: R$ {aircraftReport.valor_medio_de_hectares_total.toLocaleString()}</p>
              <p>Valor Médio de Alqueires Total: R$ {aircraftReport.valor_medio_de_alqueires_total.toLocaleString()}</p>
              <p>Total de Horas Voadas: {aircraftReport.total_de_horas_voadas}</p>
              <p>Valor Médio por Hora de Voo Total: R$   {aircraftReport.valor_medio_por_hora_de_voo_total.toLocaleString()}</p>
              <p>Lucro Total: R$ {aircraftReport.lucro_total.toLocaleString()}</p>
              <p>Total Gasto com Combustível: R$ {aircraftReport.total_gasto_combustivel.toLocaleString()}</p>
              <p>Total Gasto com Óleo: R$ {aircraftReport.total_gasto_oleo.toLocaleString()}</p>
              <p>Comissões de Pilotos: R$ {aircraftReport.comissoes_de_pilotos.toLocaleString()}</p>
              <p>Comissões de Badeco: R$ {aircraftReport.comissoes_de_badeco.toLocaleString()}</p>
              <p>Restante das Despesas: R$ {aircraftReport.restante_das_despesas.toLocaleString()}</p>
              <p>Despesas de Veículo: R$ {aircraftReport.despesas_de_veiculo.toLocaleString()}</p>
              <p>Despesas Específicas: R$ {aircraftReport.despesas_de_especificas.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#556B2F] text-white">
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Receita: R$ {data.income.toLocaleString()}</p>
            <p>Despesas: R$ {data.expenses.toLocaleString()}</p>
            <p>Lucro: R$ {(data.income - data.expenses).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#556B2F] text-white">
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
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

        <Card className="bg-white text-black">
          <CardHeader>
            <CardTitle>Relatório de Aeronaves</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] text-white">
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart data={data.aircraftReports}>
                <XAxis dataKey="name" />
                <YAxis  />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Receita" />
                <Bar dataKey="expenses" fill="#ffc658" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#556B2F] text-white">
          <CardHeader>
            <CardTitle>Despesas Detalhadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <Label htmlFor="start-date">Data Inicial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full text-black justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Label htmlFor="end-date">Data Final</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full text-black justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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


      </div>
    </div>
  )
}