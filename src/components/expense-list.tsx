'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Save, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Expense = {
  id: number
  date: string
  origin: string
  type?: string
  description?: string
  value: number
  payment: string
  aircraft?: string
  percentage?: number
  name?: string
  service?: string
  harvest: string
}

const expenseTypes = [
  { key: 'aircraft', label: 'Aeronaves' },
  { key: 'commission', label: 'Comissões' },
  { key: 'vehicle', label: 'Veículos' },
  { key: 'specific', label: 'Específicas' },
]

export function ExpenseList() {
  const [activeTab, setActiveTab] = useState('aircraft')
  const [expenses, setExpenses] = useState<Record<string, Expense[]>>({
    aircraft: [
      { id: 20, date: '24/09/2023', origin: 'Despesa do Avião', type: 'Específica', description: 'Tanque de 5 mil litros', value: 4369.00, payment: 'Pendente', aircraft: 'PT-GYG - 202 - Embraer', harvest: 'Safra 2023/2024' },
      { id: 21, date: '25/09/2023', origin: 'Despesa do Avião', type: 'Manutenção', description: 'Revisão de rotina', value: 2500.00, payment: 'Pendente', aircraft: 'PT-GYG - 202 - Embraer', harvest: 'Safra 2023/2024' },
    ],
    commission: [
      { id: 1, date: '26/09/2023', origin: 'Comissão', percentage: 5, value: 500.00, payment: 'Pendente', name: 'João Silva', service: 'Voo 123', harvest: 'Safra 2023/2024' },
      { id: 2, date: '27/09/2023', origin: 'Comissão', percentage: 7, value: 700.00, payment: 'Pendente', name: 'Maria Oliveira', service: 'Voo 456', harvest: 'Safra 2023/2024' },
    ],
    vehicle: [
      { id: 32, date: '30/09/2023', origin: 'Despesa do Veículo', type: 'Combustível', description: 'Diesel Hilux', value: 409.50, payment: 'Pendente', aircraft: 'PT-GYG - 202 - Embraer', harvest: 'Safra 2023/2024' },
      { id: 33, date: '01/10/2023', origin: 'Despesa do Veículo', type: 'Manutenção', description: 'Troca de óleo', value: 250.00, payment: 'Pendente', aircraft: 'PT-GYG - 202 - Embraer', harvest: 'Safra 2023/2024' },
    ],
    specific: [
      { id: 56, date: '20/10/2023', origin: 'Despesa Específica', description: 'Taxa Aeroporto', aircraft: 'PT-GYG-202-Embraer', value: 133.34, payment: 'Pendente', harvest: 'Safra 2023/2024' },
      { id: 57, date: '21/10/2023', origin: 'Despesa Específica', description: 'Seguro anual', aircraft: 'PT-GYG-202-Embraer', value: 5000.00, payment: 'Pendente', harvest: 'Safra 2023/2024' },
    ],
  })

  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [activeHarvest, setActiveHarvest] = useState('Safra 2023/2024')
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExpenses(expenses[activeTab].map(expense => expense.id))
    } else {
      setSelectedExpenses([])
    }
  }

  const handleSelectExpense = (expenseId: number) => {
    setSelectedExpenses(prev =>
      prev.includes(expenseId)
        ? prev.filter(id => id !== expenseId)
        : [...prev, expenseId]
    )
  }

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id)
    setEditingExpense({ ...expense })
  }

  const handleSaveEdit = () => {
    if (editingExpense) {
      setExpenses(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(expense =>
          expense.id === editingExpense.id ? editingExpense : expense
        )
      }))
      setEditingId(null)
      setEditingExpense(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingExpense(null)
  }

  const handleDelete = (id: number) => {
    setExpenses(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(expense => expense.id !== id)
    }))
  }

  const handleDeleteSelected = () => {
    setExpenses(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(expense => !selectedExpenses.includes(expense.id))
    }))
    setSelectedExpenses([])
  }

  const handleBulkUpdate = (field: string, value: string) => {
    setExpenses(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(expense =>
        selectedExpenses.includes(expense.id) ? { ...expense, [field]: value } : expense
      )
    }))
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditingExpense(prev => {
      if (prev) {
        return { ...prev, [name]: name === 'value' || name === 'percentage' ? parseFloat(value) : value }
      }
      return null
    })
  }

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const renderMobileTable = (expenses: Expense[]) => (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card key={expense.id} className="bg-[#556B2F] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ID: {expense.id} - {expense.date}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleRowExpansion(expense.id)}
            >
              {expandedRows.includes(expense.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-xs">
              <p>Origem: {expense.origin}</p>
              <p>Valor: R$ {expense.value.toFixed(2)}</p>
              <p>Pagamento: {expense.payment}</p>
            </div>
            {expandedRows.includes(expense.id) && (
              <div className="mt-2 text-xs">
                {expense.type && <p>Tipo: {expense.type}</p>}
                {expense.description && <p>Descrição: {expense.description}</p>}
                {expense.aircraft && <p>Aeronave: {expense.aircraft}</p>}
                {expense.percentage && <p>Porcentagem: {expense.percentage}%</p>}
                {expense.name && <p>Nome: {expense.name}</p>}
                {expense.service && <p>Serviço: {expense.service}</p>}
                <p>Safra: {expense.harvest}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderDesktopTable = (expenses: Expense[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-white">
            <Checkbox
              checked={selectedExpenses.length === expenses.length}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[100px] text-white">Ações</TableHead>
          <TableHead className='text-white'>ID</TableHead>
          <TableHead className='text-white'>Data</TableHead>
          <TableHead className='text-white'>Origem</TableHead>
          {activeTab !== 'commission' && <TableHead className='text-white'>Tipo</TableHead>}
          <TableHead className='text-white'>Descrição</TableHead>
          <TableHead className='text-white'>Valor</TableHead>
          <TableHead className='text-white'>Pagamento</TableHead>
          {activeTab !== 'commission' && <TableHead className='text-white'>Aeronave</TableHead>}
          {activeTab === 'commission' && (
            <>
              <TableHead className='text-white'>Porcentagem</TableHead>
              <TableHead className='text-white'>Nome</TableHead>
              <TableHead className='text-white'>Serviço</TableHead>
            </>
          )}
          <TableHead className='text-white'>Safra</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>
              <Checkbox
                checked={selectedExpenses.includes(expense.id)}
                onCheckedChange={() => handleSelectExpense(expense.id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {editingId === expense.id ? (
                  <>
                    <Button variant="outline" size="icon" onClick={handleSaveEdit}>
                      <Save className="h-4 w-4 text-[#4B5320]" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 text-[#4B5320]" />
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="icon" onClick={() => handleEdit(expense)}>
                    <Edit className="h-4 w-4 text-[#4B5320]" />
                  </Button>
                )}
                <Button variant="outline" size="icon" onClick={() => handleDelete(expense.id)}>
                  <Trash2 className="h-4 w-4 text-[#4B5320]" />
                </Button>
              </div>
            </TableCell>
            <TableCell>{expense.id}</TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  name="date"
                  value={editingExpense?.date || ''}
                  onChange={handleEditInputChange}
                  className="bg-[#556B2F] text-white border-[#8FBC8F]"
                />
              ) : (
                expense.date
              )}
            </TableCell>
            <TableCell>{expense.origin}</TableCell>
            {activeTab !== 'commission' && (
              <TableCell>
                {editingId === expense.id ? (
                  <Input
                    name="type"
                    value={editingExpense?.type || ''}
                    onChange={handleEditInputChange}
                    className="bg-[#556B2F] text-white border-[#8FBC8F]"
                  />
                ) : (
                  expense.type
                )}
              </TableCell>
            )}
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  name="description"
                  value={editingExpense?.description || ''}
                  onChange={handleEditInputChange}
                  className="bg-[#556B2F] text-white border-[#8FBC8F]"
                />
              ) : (
                expense.description
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  name="value"
                  type="number"
                  value={editingExpense?.value || ''}
                  onChange={handleEditInputChange}
                  className="bg-[#556B2F] text-white border-[#8FBC8F]"
                />
              ) : (
                `R$ ${expense.value.toFixed(2)}`
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Select
                  name="payment"
                  value={editingExpense?.payment || ''}
                  onValueChange={(value) => setEditingExpense(prev => prev ? { ...prev, payment: value } : null)}
                >
                  <SelectTrigger className="bg-[#556B2F] text-white border-[#8FBC8F]">
                    <SelectValue placeholder="Status de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem  value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                expense.payment
              )}
            </TableCell>
            {activeTab !== 'commission' && (
              <TableCell>
                {editingId === expense.id ? (
                  <Input
                    name="aircraft"
                    value={editingExpense?.aircraft || ''}
                    onChange={handleEditInputChange}
                    className="bg-[#556B2F] text-white border-[#8FBC8F]"
                  />
                ) : (
                  expense.aircraft
                )}
              </TableCell>
            )}
            {activeTab === 'commission' && (
              <>
                <TableCell>
                  {editingId === expense.id ? (
                    <Input
                      name="percentage"
                      type="number"
                      value={editingExpense?.percentage || ''}
                      onChange={handleEditInputChange}
                      className="bg-[#556B2F] text-white border-[#8FBC8F]"
                    />
                  ) : (
                    `${expense.percentage}%`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === expense.id ? (
                    <Input
                      name="name"
                      value={editingExpense?.name || ''}
                      onChange={handleEditInputChange}
                      className="bg-[#556B2F] text-white border-[#8FBC8F]"
                    />
                  ) : (
                    expense.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === expense.id ? (
                    <Input
                      name="service"
                      value={editingExpense?.service || ''}
                      onChange={handleEditInputChange}
                      className="bg-[#556B2F] text-white border-[#8FBC8F]"
                    />
                  ) : (
                    expense.service
                  )}
                </TableCell>
              </>
            )}
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  name="harvest"
                  value={editingExpense?.harvest || ''}
                  onChange={handleEditInputChange}
                  className="bg-[#556B2F] text-white border-[#8FBC8F]"
                />
              ) : (
                expense.harvest
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="p-4 sm:p-6 bg-[#4B5320] text-white rounded-lg shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Lista de Despesas</h2>
      <div className="mb-4">
        <Select value={activeHarvest} onValueChange={setActiveHarvest}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#556B2F] text-white border-[#8FBC8F]">
            <SelectValue placeholder="Selecione a safra" />
          </SelectTrigger>
          <SelectContent className="bg-[#556B2F] text-white">
            <SelectItem value="Safra 2023/2024">Safra 2023/2024</SelectItem>
            <SelectItem value="Safra 2022/2023">Safra 2022/2023</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 max-md:h-28 h-16">
          {expenseTypes.map((type) => (
            <TabsTrigger key={type.key} value={type.key} className="text-white bg-[#556B2F] my-2 mx-2">
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {expenseTypes.map((type) => (
          <TabsContent key={type.key} value={type.key}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
              <Input placeholder="Pesquisar despesas..." className="max-w-sm mb-2 sm:mb-0 bg-[#556B2F] text-white border-[#8FBC8F]" />
              <div className="flex flex-col sm:flex-row gap-2">
                {selectedExpenses.length > 0 && (
                  <>
                    <Select onValueChange={(value) => handleBulkUpdate('payment', value)}>
                      <SelectTrigger className="w-full sm:w-[180px] bg-[#556B2F] text-white border-[#8FBC8F]">
                        <SelectValue placeholder="Atualizar pagamento" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#556B2F] text-white">
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="destructive" onClick={handleDeleteSelected} className="bg-[#FF6B6B] text-white hover:bg-[#FF4040]">
                      Deletar Selecionados ({selectedExpenses.length})
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:block">
              {renderDesktopTable(expenses[type.key].filter(expense => expense.harvest === activeHarvest))}
            </div>
            <div className="sm:hidden">
              {renderMobileTable(expenses[type.key].filter(expense => expense.harvest === activeHarvest))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-[#8FBC8F] text-[#4B5320] hover:bg-[#006400]">Exportar para Planilha</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#556B2F] text-white">
          <DialogHeader>
            <DialogTitle>Exportar Despesas</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Esta funcionalidade permite exportar as despesas para uma planilha externa para controle de contas a pagar. Isso ajuda a evitar erros e facilita a gestão financeira.</p>
          </div>
          <Button onClick={() => console.log("Exportar despesas")} className="bg-[#8FBC8F] text-[#4B5320] hover:bg-[#006400]">Exportar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}