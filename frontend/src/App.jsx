import { useState,useEffect } from 'react'
import TicketList from './components/TicketList'
import {tickets as sampleTickets, getOpenTickets,getTicketStats} from "../ticket-utils"
import './App.css'

function App() {
  const [tickets, setTickets] = useState(sampleTickets);
  const [filter,setFilter] = useState ("ALL");

  // Every time filter changes, React re-renders App.
  // visible recalculates automatically — no manual DOM updates needed.

  const visible = filter ==="ALL"
  ? tickets : tickets.filter (t=>t.urgency === filter);

  const stats = getTicketStats(tickets);
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>SmartDesk Dashboard</h1>

      {/* Stats row */}
   <div style = {{display: "flex", gap :"12px", marginBottom:"20px"}}>
    {["total", "high", "medium", "low"].map(key => (
       <div key={key} style={{ flex: 1, background: "#f1f5f9", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
      <div style = {{fontSize:"22px", fontWeight: "bold"}}>{stats[key]}</div>
      <div style = {{fontSize:"12px", color: "#6b7280"}}>{key.toUpperCase()}</div>
      </div>
       
    ))}
    </div>

    {/* Filter buttons */}
    <div style ={{display:"flex", gap :"8px", marginBottom:"16px"}}>
      {["ALL", "HIGH", "MEDIUM", "LOW"]. map(f => {
        <button
          key ={f}
          onClick={()=> setFilter(f)}
          style= {{padding: "6px 14px", borderRadius:"20px", border:"1px solid #ccc",
            background: filter===f? "#1d4ed8":"white", color: filter===f ? "white": "#374151",
          cursor :"pointer"}}
          >
         {f}
        </button>
      })}
    </div>
    {/*Ticket list- passes filtered tickets down as props*/}
    <TicketList tickets={visible}/>
   </div>
  );
}

export default App;
