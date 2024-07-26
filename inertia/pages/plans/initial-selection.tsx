import { Head, router } from "@inertiajs/react"
import { useState } from "react"

export default function InitialPlanSelection(props: { starter: string, plus: string, pro: string }) {

   const [selectedPlan, setSelectedPlan] = useState('')

   const handleSubmit = (e: any) => {
      e.preventDefault()
      router.post('/plans/choose', { selectedPlan })
   }

   return (
      <>
         <Head title="Select Your Plan" />
         <div>
            <div>
               <h1>Our Plans</h1>
               <p>We have plans that fit every family. These are our standard plans for now, however, we will be adding the ability to create your own plan in the future!</p>
            </div>
            <div>
               <div>
                  <h3>Family Starter</h3>
                  <p>Price - FREE</p>
                  <p>Household Members - Up to 3</p>
                  <div>
                     <p>Features:</p>
                     <ul>
                        <li>Basic household management (create and manage a household)</li>
                        <li>User profiles</li>
                        <li>Shared calendar</li>
                        <li>Basic task and chore management (assign tasks, track completion)</li>
                        <li>Basic notifications</li>
                     </ul>
                  </div>
                  <button onClick={() => setSelectedPlan(props.starter)}>Select</button>
               </div>
               <div>
                  <h3>Family Plus</h3>
                  <p>Price - $4.99/month</p>
                  <p>Household Members - Up to 5</p>
                  <div>
                     <p>Features:</p>
                     <ul>
                        <li>All Family Starter features</li>
                        <li>Enhanced task and chore management (recurring tasks, task deadlines, notifications)</li>
                        <li>Advanced shared calendar features (color-coded events, multiple reminders)</li>
                        <li>Basic in-app messaging</li>
                        <li>Shared shopping lists</li>
                        <li>Meal planning</li>
                        <li>Basic financial management (budgeting, expense tracking)</li>
                        <li>Invitation system for family members</li>
                     </ul>
                  </div>
                  <button onClick={() => setSelectedPlan(props.plus)}>Select</button>
               </div>
               <div>
                  <h3>Family Pro</h3>
                  <p>Price - $9.99/month</p>
                  <p>Household Members - Unlimited</p>
                  <div>
                     <p>Features:</p>
                     <ul>
                        <li>All Family Plus features</li>
                        <li>Full financial management (detailed expense tracking, savings goals)</li>
                        <li>Advanced in-app messaging (group chats)</li>
                        <li>Priority customer support</li>
                        <li>Customizable themes and settings</li>
                        <li>Data export (CSV, PDF)</li>
                        <li>Real-time location tracking</li>
                        <li>Task approval system</li>
                        <li>Custom notifications</li>
                        <li>Shared calendar integration with external calendars</li>
                        <li>Photo and video sharing</li>
                        <li>Event notifications</li>
                     </ul>
                  </div>
                  <button onClick={() => setSelectedPlan(props.pro)}>Select</button>
               </div>
            </div>
            <button disabled={selectedPlan === ''} onClick={(e) => handleSubmit(e)}>Start My Plan!</button>
         </div>
      </>
   )
}