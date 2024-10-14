'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addDays, format } from 'date-fns'
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import axios from 'axios'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const expenseTypes = ['Aeronaves', 'Específicas', 'Veículos', 'Comissões']

export function DashboardPage() {
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), -30))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [selectedAircraft, setSelectedAircraft] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [aircraftReport, setAircraftReport] = useState<any>(null)
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [profitData, setProfitData] = useState<any[]>([])
  const [balanceData, setBalanceData] = useState<any>(null)
  const [expensesData, setExpensesData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [startDate, endDate, selectedAircraft, selectedEmployee])

  const fetchData = async () => {
    try {
      const startDateStr = format(startDate, 'dd_MM_yyyy')
      const endDateStr = format(endDate, 'dd_MM_yyyy')

      const [revenueRes, profitRes, balanceRes] = await Promise.all([
        axios.get(`/receita_por_aeronave/${startDateStr}/${endDateStr}/`),
        axios.get(`/lucro_por_aeronave/${startDateStr}/${endDateStr}/`),
        axios.get(`/gerar_balanco/${startDateStr}/${endDateStr}/`)
      ])

      setRevenueData(revenueRes.data)
      setProfitData(profitRes.data)
      setBalanceData(balanceRes.data)

      if (selectedAircraft) {
        const aircraftReportRes = await axios.get(`/gerar_relatorio_da_aeronave/${startDateStr}/${endDateStr}/${selectedAircraft}/`)
        setAircraftReport(aircraftReportRes.data)
      }

      if (selectedEmployee && selectedAircraft) {
        const expensesRes = await axios.get(`/despesas_por_categoria_especifica/${startDateStr}/${endDateStr}/${selectedEmployee}/${selectedAircraft}/`)
        setExpensesData(expensesRes.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div className="p-6 bg-[#4B5320] rounded-lg shadow text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">Dashboard Agrícola</h2>
        <div className="space-y-2 w-full md:w-auto">
          <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Selecione a aeronave" />
            </SelectTrigger>
            <SelectContent>
              {revenueData.map((item) => (
                <SelectItem key={item.aircraft_name} value={item.aircraft_name}>{item.aircraft_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Selecione o funcionário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Funcionário 1</SelectItem>
              <SelectItem value="2">Funcionário 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="start-date">Data Inicial</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(startDate, "dd/MM/yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => date && setStartDate(date)}
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
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(endDate, "dd/MM/yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => date && setEndDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-[#556B2F]">
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            {balanceData && (
              <>
                <p>Receita Total: R$ {balanceData.total_valor_area.toLocaleString()}</p>
                <p>Despesas Totais: R$ {balanceData.total_despesas.toLocaleString()}</p>
                <p>Lucro Líquido: R$ {balanceData.lucro_liquido.toLocaleString()}</p>
                <p>Total Gasto com Combustível: R$ {balanceData.total_combustivel_gasto_na_area.toLocaleString()}</p>
                <p>Total Gasto com Óleo: R$ {balanceData.total_oleo_gasto.toLocaleString()}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#556B2F]">
          <CardHeader>
            <CardTitle>Receita por Aeronave</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="aircraft_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_valor_total_da_area" fill="#82ca9d" name="Receita" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#556B2F]">
          <CardHeader>
            <CardTitle>Lucro por Aeronave</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData}>
                <XAxis dataKey="aircraft_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lucro_por_area" fill="#8884d8" name="Lucro" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {aircraftReport && (
          <Card className="bg-[#556B2F]">
            <CardHeader>
              <CardTitle>Relatório da Aeronave: {aircraftReport.nome_aeronave}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Área Total Aplicada (Hectares): {aircraftReport.total_de_area_aplicada_em_hectares}</p>
              <p>Área Total Aplicada (Alqueires): {aircraftReport.total_de_area_aplicada_em_alqueires}</p>
              <p>Valor Total Bruto: R$ {aircraftReport.valor_total_bruto_recebido.toLocaleString()}</p>
              <p>Lucro Total: R$ {aircraftReport.lucro_total.toLocaleString()}</p>
              <p>Total de Horas Voadas: {aircraftReport.total_de_horas_voadas}</p>
              <p>Valor Médio por Hora de Voo: R$ {aircraftReport.valor_medio_por_hora_de_voo_total.toLocaleString()}</p>
            </CardContent>
          </Card>
        )}

        {expensesData.length > 0 && (
          <Card className="bg-[#556B2F]">
            <CardHeader>
              <CardTitle>Despesas Detalhadas</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expensesData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Valor" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}