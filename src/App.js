import Container from 'react-bootstrap/Container'
import {Stack, Button} from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModel';
import AddExpenseModal from './components/AddExpenseModel';
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal';
import {useState} from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpesneModalBudgetId, setAddExpesneModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()


  const openAddExpesneModal =(budgetId)=>{
    setShowAddExpenseModal(true)
    setAddExpesneModalBudgetId(budgetId)
  }


  const {budgets, getBudgetExpenses} = useBudgets() 
  return (
    <>
      <Container className="my-4"> 
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={()=> setShowAddBudgetModal(true)} > Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpesneModal} > Add Expenses</Button>
        </Stack>
        <div style={{
          display:"grid", 
          gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
          gap:"1rem",
          alignItems:"flex-start"
          }}>
            {budgets.map(budget=>{
              const amount = getBudgetExpenses(budget.id)?.reduce((total, expense) => total + expense.amount, 0 )
              return (
            <BudgetCard 
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max}
            onAddExpesneClick={()=>addExpesneModalBudgetId(budget.id)}
            onViewExpesneClick={()=>setViewExpensesModalBudgetId(budget.id)}
            />)
            })}
            <UncategorizedBudgetCard 
              onAddExpesneClick={addExpesneModalBudgetId}
              onViewExpesneClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}

            />
            <TotalBudgetCard />

          </div>
      </Container>
      <AddBudgetModal 
      show={showAddBudgetModal} 
      handleClose={()=>setShowAddBudgetModal(false)}/>
      <AddExpenseModal 
      show={showAddExpenseModal} 
      defaultBudgetId={addExpesneModalBudgetId}
      handleClose={()=>setShowAddExpenseModal(false)} />
      <ViewExpensesModal 
      budgetId={viewExpensesModalBudgetId} 
      handleClose={()=>setViewExpensesModalBudgetId()} />

      </>
    
  );
}

export default App;
