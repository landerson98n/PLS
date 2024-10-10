import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, ChevronUp, Edit, Save, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'

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
}

export function ServiceList() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      data_inicio: '16/09/2023',
      data_final: '16/09/2023',
      solicitante_da_area: 'Rogers',
      nome_da_area: 'Pista do Bra',
      tamanho_area_hectares: 164,
      tamanho_area_alqueires: 33.88,
      tipo_aplicacao_na_area: 'Semente',
      quantidade_no_hopper_por_voo: 340,
      tipo_de_vazao: 'Normal',
      quantidade_de_voos_na_area: 5,
      valor_por_alqueire: 1000,
      valor_por_hectare: 413.22,
      valor_medio_por_hora_de_voo: 2000,
      valor_total_da_area: 33880,
      confirmacao_de_pagamento_da_area: 'Pago',
      tempo_de_voo_gasto_na_area: '2:30',
      aeronave_id: 1,
      aeronave_data: 'Aeronave 1',
      employee_id: 1,
      employee_data: 'Piloto 1',
      lucro_por_area: 10000,
      percentual_de_lucro_liquido_por_area: 29.52,
      criado_em: '15/09/2023 10:30:00',
      criado_por: 'Admin'
    },
    {
      id: 2,
      data_inicio: '16/09/2023',
      data_final: '16/09/2023',
      solicitante_da_area: 'Rogers',
      nome_da_area: 'Pista do Bra',
      tamanho_area_hectares: 164,
      tamanho_area_alqueires: 33.88,
      tipo_aplicacao_na_area: 'Semente',
      quantidade_no_hopper_por_voo: 340,
      tipo_de_vazao: 'Normal',
      quantidade_de_voos_na_area: 5,
      valor_por_alqueire: 1000,
      valor_por_hectare: 413.22,
      valor_medio_por_hora_de_voo: 2000,
      valor_total_da_area: 33880,
      confirmacao_de_pagamento_da_area: 'Pago',
      tempo_de_voo_gasto_na_area: '2:30',
      aeronave_id: 1,
      aeronave_data: 'Aeronave 1',
      employee_id: 1,
      employee_data: 'Piloto 1',
      lucro_por_area: 10000,
      percentual_de_lucro_liquido_por_area: 29.52,
      criado_em: '15/09/2023 10:30:00',
      criado_por: 'Admin'
    }, {
      id: 3,
      data_inicio: '16/09/2023',
      data_final: '16/09/2023',
      solicitante_da_area: 'Rogers',
      nome_da_area: 'Pista do Bra',
      tamanho_area_hectares: 164,
      tamanho_area_alqueires: 33.88,
      tipo_aplicacao_na_area: 'Semente',
      quantidade_no_hopper_por_voo: 340,
      tipo_de_vazao: 'Normal',
      quantidade_de_voos_na_area: 5,
      valor_por_alqueire: 1000,
      valor_por_hectare: 413.22,
      valor_medio_por_hora_de_voo: 2000,
      valor_total_da_area: 33880,
      confirmacao_de_pagamento_da_area: 'Pago',
      tempo_de_voo_gasto_na_area: '2:30',
      aeronave_id: 1,
      aeronave_data: 'Aeronave 1',
      employee_id: 1,
      employee_data: 'Piloto 1',
      lucro_por_area: 10000,
      percentual_de_lucro_liquido_por_area: 29.52,
      criado_em: '15/09/2023 10:30:00',
      criado_por: 'Admin'
    }, {
      id: 4,
      data_inicio: '16/09/2023',
      data_final: '16/09/2023',
      solicitante_da_area: 'Rogers',
      nome_da_area: 'Pista do Bra',
      tamanho_area_hectares: 164,
      tamanho_area_alqueires: 33.88,
      tipo_aplicacao_na_area: 'Semente',
      quantidade_no_hopper_por_voo: 340,
      tipo_de_vazao: 'Normal',
      quantidade_de_voos_na_area: 5,
      valor_por_alqueire: 1000,
      valor_por_hectare: 413.22,
      valor_medio_por_hora_de_voo: 2000,
      valor_total_da_area: 33880,
      confirmacao_de_pagamento_da_area: 'Pago',
      tempo_de_voo_gasto_na_area: '2:30',
      aeronave_id: 1,
      aeronave_data: 'Aeronave 1',
      employee_id: 1,
      employee_data: 'Piloto 1',
      lucro_por_area: 10000,
      percentual_de_lucro_liquido_por_area: 29.52,
      criado_em: '15/09/2023 10:30:00',
      criado_por: 'Admin'
    },
  ])

  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, data: '16/09/2023', origem: 'Combustível', porcentagem: 20, valor: 1000, pagamento: 'Pago', funcionario: 'Piloto 1' },
    { id: 2, data: '16/09/2023', origem: 'Manutenção', porcentagem: 10, valor: 500, pagamento: 'Pendente', funcionario: 'Mecânico 1' },
    // Add more sample expense data as needed
  ])
  const [activeHarvest, setActiveHarvest] = useState('Safra 2023/2024')

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)

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

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditingService(prev => {
      if (prev) {
        return { ...prev, [name]: value }
      }
      return null
    })
  }

  const handleEditSelectChange = (name: string, value: string) => {
    setEditingService(prev => {
      if (prev) {
        return { ...prev, [name]: value }
      }
      return null
    })
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(prev => prev.filter(service => service.id !== serviceId))
  }

  const handleBulkUpdate = (field: string, value: string) => {
    setServices(prev => prev.map(service =>
      selectedServices.includes(service.id) ? { ...service, [field]: value } : service
    ))
  }

  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const renderMobileView = () => (
    <div className="space-y-4">
      {services.map((service) => (
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
                <p>Pagamento: {service.confirmacao_de_pagamento_da_area}</p>
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
                  <Button variant="outline" size="sm" className=' text-black'>Ver Despesas</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#4B5320] text-white">
                  <DialogHeader>
                    <DialogTitle>Despesas do Serviço {service.id}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[300px]">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="mb-2 p-2 bg-[#556B2F] rounded">
                        <p>Data: {expense.data}</p>
                        <p>Origem: {expense.origem}</p>
                        <p>Valor: R$ {expense.valor.toFixed(2)}</p>
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Serviços:</h2>
          <div className="mt-4">
            <Select value={activeHarvest} onValueChange={setActiveHarvest}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a safra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Safra 2023/2024">Safra 2023/2024</SelectItem>
                <SelectItem value="Safra 2022/2023">Safra 2022/2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
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
      </div>
      <div className="max-md:hidden">
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedServices.length === services.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className='text-white' className='text-white'>Ações</TableHead>
            <TableHead className='text-white' >ID</TableHead>
            <TableHead className='text-white' >Data de Início</TableHead>
            <TableHead className='text-white' >Data Final</TableHead>
            <TableHead className='text-white' >Solicitante da Área</TableHead>
            <TableHead className='text-white' >Nome da Área</TableHead>
            <TableHead className='text-white' >Tamanho da Área (Hectares)</TableHead>
            <TableHead className='text-white' >Tamanho da Área (Alqueires)</TableHead>
            <TableHead className='text-white' >Tipo de Aplicação na Área</TableHead>
            <TableHead className='text-white' >Quantidade no hopper por voo</TableHead>
            <TableHead className='text-white' >Tipo de Vazão</TableHead>
            <TableHead className='text-white' >Quantidade de Voos na Área</TableHead>
            <TableHead className='text-white' >Valor por Alqueire</TableHead>
            <TableHead className='text-white' >Valor por Hectare</TableHead>
            <TableHead className='text-white' >Valor Médio por Hora de Voo</TableHead>
            <TableHead className='text-white' >Valor Total da Área</TableHead>
            <TableHead className='text-white' >Confirmação de Pagamento da Área</TableHead>
            <TableHead className='text-white' >Tempo de Voo Gasto na Área</TableHead>
            <TableHead className='text-white' >Aeronave</TableHead>
            <TableHead className='text-white' >Piloto</TableHead>
            <TableHead className='text-white' >Lucro por Área</TableHead>
            <TableHead className='text-white' >Percentual de Lucro Líquido por Área</TableHead>
            <TableHead className='text-white' >Criado Em</TableHead>
            <TableHead className='text-white' >Criado Por</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {services.map((service) => (
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
                        <Save className="h-4 w-4 " />
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
                  {!editingId &&
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
                              <TableHead>Pagamento</TableHead>
                              <TableHead>Funcionário</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {expenses.map((expense) => (
                              <TableRow key={expense.id}>
                                <TableCell>{expense.id}</TableCell>
                                <TableCell>{expense.data}</TableCell>
                                <TableCell>{expense.origem}</TableCell>
                                <TableCell>{expense.porcentagem}%</TableCell>
                                <TableCell>R$ {expense.valor.toFixed(2)}</TableCell>
                                <TableCell>{expense.pagamento}</TableCell>
                                <TableCell>{expense.funcionario}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>}

                </div>
              </TableCell>
              <TableCell>{service.id}</TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="data_inicio"
                    value={editingService?.data_inicio || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.data_inicio
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="data_final"
                    value={editingService?.data_final || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.data_final
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="solicitante_da_area"
                    value={editingService?.solicitante_da_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.solicitante_da_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="nome_da_area"
                    value={editingService?.nome_da_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.nome_da_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="tamanho_area_hectares"
                    type="number"
                    value={editingService?.tamanho_area_hectares || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.tamanho_area_hectares
                )}
              </TableCell>
              <TableCell>{service.tamanho_area_alqueires}</TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Select
                    name="tipo_aplicacao_na_area"
                    value={editingService?.tipo_aplicacao_na_area || ''}
                    onValueChange={(value) => handleEditSelectChange('tipo_aplicacao_na_area', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Semente">Semente</SelectItem>
                      <SelectItem value="Fertilizante">Fertilizante</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  service.tipo_aplicacao_na_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="quantidade_no_hopper_por_voo"
                    type="number"

                    value={editingService?.quantidade_no_hopper_por_voo || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.quantidade_no_hopper_por_voo
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="tipo_de_vazao"
                    value={editingService?.tipo_de_vazao || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.tipo_de_vazao
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="quantidade_de_voos_na_area"
                    type="number"
                    value={editingService?.quantidade_de_voos_na_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.quantidade_de_voos_na_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="valor_por_alqueire"
                    type="number"
                    value={editingService?.valor_por_alqueire || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `R$ ${service.valor_por_alqueire.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="valor_por_hectare"
                    type="number"
                    value={editingService?.valor_por_hectare || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `R$ ${service.valor_por_hectare.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="valor_medio_por_hora_de_voo"
                    type="number"
                    value={editingService?.valor_medio_por_hora_de_voo || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `R$ ${service.valor_medio_por_hora_de_voo.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="valor_total_da_area"
                    type="number"
                    value={editingService?.valor_total_da_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `R$ ${service.valor_total_da_area.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Select
                    name="confirmacao_de_pagamento_da_area"
                    value={editingService?.confirmacao_de_pagamento_da_area || ''}
                    onValueChange={(value) => handleEditSelectChange('confirmacao_de_pagamento_da_area', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Em aberto">Em aberto</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  service.confirmacao_de_pagamento_da_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="tempo_de_voo_gasto_na_area"
                    value={editingService?.tempo_de_voo_gasto_na_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.tempo_de_voo_gasto_na_area
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="aeronave_data"
                    value={editingService?.aeronave_data || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.aeronave_data
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="employee_data"
                    value={editingService?.employee_data || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  service.employee_data
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="lucro_por_area"
                    type="number"
                    value={editingService?.lucro_por_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `R$ ${service.lucro_por_area.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === service.id ? (
                  <Input
                    className='w-24'
                    name="percentual_de_lucro_liquido_por_area"
                    type="number"
                    value={editingService?.percentual_de_lucro_liquido_por_area || ''}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  `${service.percentual_de_lucro_liquido_por_area.toFixed(2)}%`
                )}
              </TableCell>
              <TableCell>{service.criado_em}</TableCell>
              <TableCell>{service.criado_por}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      

      <div className="sm:hidden">
        {renderMobileView()}
      </div>
    </div>
  )
}