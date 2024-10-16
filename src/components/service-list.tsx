'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, ChevronUp, Edit, Save, Trash2, X, Search, Filter, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import axios from 'axios'

type Service = {
  id: number
  data_inicio: string
  data_final: string | null
  solicitante_da_area: string
  nome_da_area: string
  tamanho_area_hectares: number
  tamanho_area_alqueires: number
  tipo_aplicacao_na_area: string
  quantidade_no_hopper_por_voo: number
  tipo_de_vazao: string
  quantidade_de_voos_na_area: number
  valor_por_alqueire: number
  valor_por_hectare: number
  valor_medio_por_hora_de_voo: number
  valor_total_da_area: number
  confirmacao_de_pagamento_da_area: string
  tempo_de_voo_gasto_na_area: string
  aeronave_id: number
  aeronave_data: string
  employee_id: number
  employee_data: string
  lucro_por_area: number
  percentual_de_lucro_liquido_por_area: number
  criado_em: string
  criado_por: string
}

type Expense = {
  id: number
  data: string
  origem: string
  porcentagem: number
  valor: number
  pagamento: string
  funcionario: string
  service_id: string
}

type Safra = {
  id: string;
  startDate: string;
  endDate: string;
  label: string;
}

export function ServiceList({ selectedSafra }: { selectedSafra: Safra }) {
  const [services, setServices] = useState<Service[]>([])
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  // State variables for pagination, filtering, and search
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      const dataExpense = await axios.get('http://0.0.0.0:8000/expenses')
      setServices(data)
      setExpenses(dataExpense.data)
    }
    fetchData()
  }, [selectedSafra])

  async function getData() {
    const servicos = await axios.get('http://0.0.0.0:8000/services')
    return servicos.data as Service[] || []
  }

  // Filter and search function
  const filteredServices = services.filter(service => {
    const serviceDate = new Date(service.data_inicio)
    const safraStartDate = selectedSafra ? new Date(selectedSafra.startDate) : null
    const safraEndDate = selectedSafra ? new Date(selectedSafra.endDate) : null

    const isWithinSafraDates = !selectedSafra ||
      (serviceDate >= safraStartDate && serviceDate <= safraEndDate)

    const matchesSearch =
      service.aeronave_data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.employee_data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.confirmacao_de_pagamento_da_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.nome_da_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.solicitante_da_area.toLowerCase().includes(searchTerm.toLowerCase())
    return isWithinSafraDates && matchesSearch
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedServices(services.map(service => service.id))
    } else {
      setSelectedServices([])
    }
  }

  const handleSelectService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleDeleteSelected = () => {
    setServices(prev => prev.filter(service => !selectedServices.includes(service.id)))
    setSelectedServices([])
  }

  const handleEditService = (service: Service) => {
    setEditingId(service.id)
    setEditingService({ ...service })
  }

  const handleSaveEdit = () => {
    if (editingService) {
      setServices(prev => prev.map(service =>
        service.id === editingService.id ? editingService : service
      ))
      setEditingId(null)
      setEditingService(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingService(null)
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(prev => prev.filter(service => service.id !== serviceId))
  }

  const handleBulkUpdate = (field: string, value: string) => {
    setServices(prev => prev.map(service =>
      selectedServices.includes(service.id) ? { ...service, [field]: value } : service
    ))
  }

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const maxVisibleButtons = 5

  const renderPaginationButtons = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }

    const buttons = []

    if (startPage > 1) {
      buttons.push(
        <Button key="first" onClick={() => paginate(1)} variant="outline" className="text-white">
          <ChevronsLeft className="h-4 w-4 text-black" />
        </Button>
      )
    }

    if (currentPage > 1) {
      buttons.push(
        <Button key="prev" onClick={() => paginate(currentPage - 1)} variant="outline" className="text-white">
          <ChevronLeft className="h-4 w-4 text-black" />
        </Button>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => paginate(i)}
          variant={currentPage === i ? "default" : "outline"}
          className={`${currentPage === i ? "bg-[#8FBC8F] text-white" : "text-black"}`}
        >
          {i}
        </Button>
      )
    }

    if (currentPage < totalPages) {
      buttons.push(
        <Button key="next" onClick={() => paginate(currentPage + 1)} variant="outline" className="text-white">
          <ChevronRight className="h-4 w-4 text-black" />
        </Button>
      )
    }

    if (endPage < totalPages) {
      buttons.push(
        <Button key="last" onClick={() => paginate(totalPages)} variant="outline" className="text-white">
          <ChevronsRight className="h-4 w-4 text-black" />
        </Button>
      )
    }

    return buttons
  }

  const renderMobileView = () => (
    <div className="space-y-4">
      {currentItems.map((service) => (
        <Card key={service.id} className="bg-[#556B2F] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Serviço ID: {service.id}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleRowExpansion(service.id)}
            >
              {expandedRows.includes(service.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-xs">
              <p>Data de Início: {service.data_inicio}</p>
              <p>Solicitante: {service.solicitante_da_area}</p>
              <p>Área: {service.nome_da_area}</p>
              <p>Valor Total: R$ {service.valor_total_da_area.toFixed(2)}</p>
              <p className={`${service.confirmacao_de_pagamento_da_area.toLowerCase().includes("Em Aberto".toLowerCase()) && 'bg-yellow-400'}`}>{service.confirmacao_de_pagamento_da_area}</p>
            </div>
            {expandedRows.includes(service.id) && (
              <div className="mt-2 text-xs">
                <p>Data Final: {service.data_final}</p>
                <p>Tamanho (Hectares): {service.tamanho_area_hectares}</p>
                <p>Tamanho (Alqueires): {service.tamanho_area_alqueires}</p>
                <p>Tipo de Aplicação: {service.tipo_aplicacao_na_area}</p>
                <p>Quantidade no Hopper: {service.quantidade_no_hopper_por_voo}</p>
                <p>Tipo de Vazão: {service.tipo_de_vazao}</p>
                <p>Quantidade de Voos: {service.quantidade_de_voos_na_area}</p>
                <p>Valor por Alqueire: R$ {service.valor_por_alqueire.toFixed(2)}</p>
                <p>Valor por Hectare: R$ {service.valor_por_hectare.toFixed(2)}</p>
                <p>Valor Médio por Hora: R$ {service.valor_medio_por_hora_de_voo.toFixed(2)}</p>
                <p>Tempo de Voo: {service.tempo_de_voo_gasto_na_area}</p>
                <p>Aeronave: {service.aeronave_data}</p>
                <p>Piloto: {service.employee_data}</p>
                <p>Lucro: R$ {service.lucro_por_area.toFixed(2)}</p>
                <p>Percentual de Lucro: {service.percentual_de_lucro_liquido_por_area.toFixed(2)}%</p>
                <p>Criado em: {service.criado_em}</p>
                <p>Criado por: {service.criado_por}</p>
              </div>
            )}
            <div className="mt-2 flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                <Edit className="h-4 w-4 text-black" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                <Trash2 className="h-4 w-4  text-black" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className='text-black'>Ver Despesas</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#4B5320] text-white">
                  <DialogHeader>
                    <DialogTitle>Despesas do Serviço {service.id}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[300px]">
                    {expenses.map((expense) => (
                      parseInt(expense.service_id) === service.id && <div key={expense.id} className="mb-2 p-2 bg-[#556B2F] rounded">
                        <p>Data: {expense.data}</p>
                        <p>Origem: {expense.origem}</p>
                        <p>Valor: R$ {expense.valor}</p>
                        <p>Pagamento: {expense.pagamento}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="p-6 bg-[#4B5320] rounded-lg text-white">
      <div className="flex flex-col space-y-4 mb-6">
        <h2 className="text-2xl font-bold">Serviços:</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <Input
              placeholder="Pesquisar serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedServices.length > 0 && (
          <>
            <Select onValueChange={(value) => handleBulkUpdate('confirmacao_de_pagamento_da_area', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Atualizar pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Em aberto">Em aberto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Deletar Selecionados ({selectedServices.length})
            </Button>
          </>
        )}
      </div>

      <div className="max-md:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedServices.length === services.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className='text-white'>Ações</TableHead>
              <TableHead className='text-white'>ID</TableHead>
              <TableHead className='text-white'>Aeronave</TableHead>
              <TableHead className='text-white'>Piloto</TableHead>
              <TableHead className='text-white'>Confirmação de Pagamento da Área</TableHead>
              <TableHead className='text-white'>Valor Total da Área</TableHead>
              <TableHead className='text-white'>Data de Início</TableHead>
              <TableHead className='text-white'>Data Final</TableHead>
              <TableHead className='text-white'>Solicitante da Área</TableHead>
              <TableHead className='text-white'>Nome da Área</TableHead>
              <TableHead className='text-white'>Tamanho da Área (Hectares)</TableHead>
              <TableHead className='text-white'>Tamanho da Área (Alqueires)</TableHead>
              <TableHead className='text-white'>Tipo de Aplicação na Área</TableHead>
              <TableHead className='text-white'>Quantidade no hopper por voo</TableHead>
              <TableHead className='text-white'>Tipo de Vazão</TableHead>
              <TableHead className='text-white'>Quantidade de Voos na Área</TableHead>
              <TableHead className='text-white'>Valor por Alqueire</TableHead>
              <TableHead className='text-white'>Valor por Hectare</TableHead>
              <TableHead className='text-white'>Valor Médio por Hora de Voo</TableHead>
              <TableHead className='text-white'>Tempo de Voo Gasto na Área</TableHead>
              <TableHead className='text-white'>Lucro por Área</TableHead>
              <TableHead className='text-white'>Percentual de Lucro Líquido por Área</TableHead>
              <TableHead className='text-white'>Criado Em</TableHead>
              <TableHead className='text-white'>Criado Por</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleSelectService(service.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 text-black">
                    {editingId === service.id ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleSaveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Ver Despesas</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Despesas do Serviço {service.id}</DialogTitle>
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Origem</TableHead>
                              <TableHead>Porcentagem</TableHead>
                              <TableHead>Valor</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {expenses.map((expense) => (
                              parseInt(expense.service_id) === service.id && <TableRow key={expense.id}>
                                <TableCell>{expense.id}</TableCell>
                                <TableCell>{expense.data}</TableCell>
                                <TableCell>{expense.origem}</TableCell>
                                <TableCell>{expense.porcentagem}%</TableCell>
                                <TableCell>R$ {expense.valor}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.aeronave_data}</TableCell>
                <TableCell>{service.employee_data}</TableCell>
                <TableCell><p className={`${service.confirmacao_de_pagamento_da_area.toLowerCase().includes("Em Aberto".toLowerCase()) && 'bg-yellow-400'}`}>{service.confirmacao_de_pagamento_da_area}</p></TableCell>
                <TableCell>R$ {service.valor_total_da_area.toFixed(2)}</TableCell>
                <TableCell>{service.data_inicio}</TableCell>
                <TableCell>{service.data_final}</TableCell>
                <TableCell>{service.solicitante_da_area}</TableCell>
                <TableCell>{service.nome_da_area}</TableCell>
                <TableCell>{service.tamanho_area_hectares}</TableCell>
                <TableCell>{service.tamanho_area_alqueires}</TableCell>
                <TableCell>{service.tipo_aplicacao_na_area}</TableCell>
                <TableCell>{service.quantidade_no_hopper_por_voo}</TableCell>
                <TableCell>{service.tipo_de_vazao}</TableCell>
                <TableCell>{service.quantidade_de_voos_na_area}</TableCell>
                <TableCell>R$ {service.valor_por_alqueire.toFixed(2)}</TableCell>
                <TableCell>R$ {service.valor_por_hectare.toFixed(2)}</TableCell>
                <TableCell>R$ {service.valor_medio_por_hora_de_voo.toFixed(2)}</TableCell>
                <TableCell>{service.tempo_de_voo_gasto_na_area}</TableCell>
                <TableCell>R$ {service.lucro_por_area.toFixed(2)}</TableCell>
                <TableCell>{service.percentual_de_lucro_liquido_por_area.toFixed(2)}%</TableCell>
                <TableCell>{service.criado_em}</TableCell>
                <TableCell>{service.criado_por}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        {renderMobileView()}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  )
}