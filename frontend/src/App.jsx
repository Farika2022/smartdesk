import { useState,useEffect } from 'react'
import TicketList from './components/TicketList'
import TicketForm from './components/TicketForm'
import {tickets as sampleTickets, getOpenTickets,getTicketStats} from "../ticket-utils"
import './App.css'

function App() {
  const [tickets, setTickets] = useState(sampleTickets);
  const [filter,setFilter] = useState ("ALL");
  const [view, setView] = useState("dashboard");
  // Every time filter changes, React re-renders App.
  // visible recalculates automatically — no manual DOM updates needed.

  const visible = filter ==="ALL"
  ? tickets : tickets.filter (t=>t.urgency === filter);

  const stats = getTicketStats(tickets);

  // TicketForm calls onSubmit(newTicket) when submitted.
  // This function receives that ticket and adds it to the array.

  const handleNewTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
   // setView("dashboard"); // switch back to dashboard after submit
    setTimeout(() => {
    setView("dashboard");
  }, 20000);
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
     
      {/* Navigation */}
      <div style ={{display:"flex", justifyContent:"space-around", alignItems:"center",marginBottom:"24px"}}>
        <h1 style={{margin:0}} >SmartDesk</h1>
        <div style={{display:"flex",gap:"8px"}}>
          <button
            onClick={()=>setView("dashboard")}
            style ={{padding:view ==="dashboard" ? "#1d4ed8":"white", color: view==="dashboard"?"white":"#374151",cursor:"pointer"}}
          >
            Dashboard
          </button>
          <button onClick={()=> setView("submit")}
            style={{padding:"6px 14px",borderRadius:"8px",border:"1px solid #d1d5db",
              background:view === "submit" ? "#1d4ed8" :"white",
              color:view ==="submit" ? "white" :"#374151", cursor:"pointer"
            }}>
              Submit ticket
            </button>
        </div>
      </div>
     {view === "submit" && (
        <TicketForm onSubmit={handleNewTicket} />
      )}
     {view === "dashboard" &&(
      <>
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
      {["ALL", "HIGH", "MEDIUM", "LOW"]. map(f => (
        <button
          key ={f}
          onClick={()=> setFilter(f)}
          style= {{padding: "6px 14px", borderRadius:"20px", border:"1px solid #ccc",
            background: filter===f? "#1d4ed8":"white", color: filter===f ? "white": "#374151",
          cursor :"pointer"}}
          >
         {f}
        </button>
      ))}
    </div>
    {/*Ticket list- passes filtered tickets down as props*/}
    <TicketList tickets={visible}/>
    </>
    )}
   </div>
  );
}

export default App;
