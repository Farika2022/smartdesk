// SmartDesk — ticket utilities
// All the core logic for creating, reading, and filtering
// tickets lives here. This keeps the logic in one place.
// When React needs to display tickets, it imports from here.
// When the .NET backend sends data back, this file processes it.
// ============================================================
 

// --- VARIABLES ---
// CAPITALS = a global rule for the whole app.
const URGENCY_LEVELS = ["LOW", "MEDIUM", "HIGH"];

// WHY store this as a constant?
// The same limit is used in three places:
//   1. The React form (stops the user typing too much)
//   2. The .NET API (validates before saving)
//   3. The dashboard (truncates long subjects in the list)
// One number, defined once, used everywhere.
const MAX_SUBJECT_LENGTH = 100;

// ── SAMPLE DATA — array of ticket objects ───────────────────
 
// WHY an array of objects?
// A variable holds ONE thing. An array holds MANY things.
// Each item in this array is a ticket object —
// exactly the shape the .NET backend will send back later.
// When we connect to the real database, we replace this
// array with a fetch() call. The rest of the code stays the same.
 
const tickets = [
  {
    id: 10001,
    customer: "Lars Nielsen",
    email: "lars@example.com",
    subject: "Front wheel is making a grinding noise",
    status: "open",
    urgency: "HIGH",
    createdAt: "2026-07-10T08:23:00.000Z",
  },
  {
    id: 10002,
    customer: "Sofia Berg",
    email: "sofia@example.com",
    subject: "Invoice shows wrong VAT amount",
    status: "open",
    urgency: "LOW",
    createdAt: "2026-07-11T10:05:00.000Z",
  },
  {
    id: 10003,
    customer: "Mikkel Holm",
    email: "mikkel@example.com",
    subject: "Battery not charging past 40 percent",
    status: "resolved",
    urgency: "MEDIUM",
    createdAt: "2026-07-12T14:30:00.000Z",
  },
  {
    id: 10004,
    customer: "Anna Dahl",
    email: "anna@example.com",
    subject: "App crashes on startup after update",
    status: "open",
    urgency: "HIGH",
    createdAt: "2026-07-13T09:15:00.000Z",
  },
  {
    id: 10005,
    customer: "Jonas Lund",
    email: "jonas@example.com",
    subject: "Armrest cushion is coming loose",
    status: "open",
    urgency: "LOW",
    createdAt: "2026-07-14T11:45:00.000Z",
  },
];
 
// --- FUNCTIONS ---
 
function createTicket(customerName,email,subject){

// new Date() = right now as a Date object.
// .toISOString() = "2026-07-17T10:30:00.000Z"
// WHY ISO? PostgreSQL stores timestamps in this exact format.
// Using ISO from the start means zero conversion needed later
const ticketId = Math.floor(Math.random()* 90000)+10000;
const createdAt= new Date().toISOString() ;
return{
    id:ticketId,
    customer: customerName,
    email: email,
    subject: subject,
    status: "open",
    urgency: "MEDIUM",
    createdAt: createdAt,
};
}


// Python AI service sends ticket to Claude API.
const getUrgencyLevel = (score)=>{
    if (score >80)return "HIGH";
    if (score >40) return "MEDIUM";
    return "LOW";
};

// browser tab title, admin CSV export.
const formatTicketLabel =(ticket)=>{
    return "[" + ticket.urgency + "#" + ticket.id +"-"+ ticket.subject + "]";

};

// ── ARRAY METHODS ────────────────────────────────────────────
// These functions USE the tickets array.
// React components will import these to power the dashboard.
 
// Dashboard default view = open tickets only.
// Resolved tickets go to the archive view.
const getOpenTickets = (ticketArray)=> {
    return ticketArray.filter((ticket)=> ticket.status === "open");
};

// Dashboard filter buttons (HIGH / MEDIUM / LOW) call this.
const getTicketsByUrgency = (ticketArray,urgencyLevel)=>{
    return ticketArray.filter((ticket)=>ticket.urgency===urgencyLevel);
};

// map() loops through every item and TRANSFORMS it into
// something new. Returns a NEW array. Original unchanged.
// React calls this to turn ticket objects into label strings
const formatAllTickets= (ticketArray)=> {
    return ticketArray.map ((ticket)=>formatTicketLabel(ticket));
    // Each ticket object → becomes a formatted string label
};

// Dashboard header shows: Total | HIGH | MEDIUM | LOW | Open.
// All five numbers calculated in one call, returned as one object.
const getTicketStats=(ticketArray)=>{
    return{
        total: ticketArray.length,
        high: ticketArray.filter((t)=>t.urgency==="HIGH").length,
        medium: ticketArray.filter((t) => t.urgency === "MEDIUM").length,
        low:    ticketArray.filter((t) => t.urgency === "LOW").length,
        open:   ticketArray.filter((t) => t.status === "open").length,

    };
};
// --- ---------- TEST. -------------
console.log("── createTicket ──────────────────────────");
const myTicket = createTicket("Farika","Farika@test.com","Walker wheelchair broken");
console.log(myTicket);

console.log("\n── getUrgencyLevel ───────────────────────");
console.log(getUrgencyLevel(90));  // HIGH
console.log(getUrgencyLevel(60));  // MEDIUM
console.log(getUrgencyLevel(20));  // LOW
 
console.log("\n── formatTicketLabel ─────────────────────");
console.log(formatTicketLabel(tickets[0]));
 
console.log("\n── getOpenTickets ────────────────────────");
const open = getOpenTickets(tickets);
console.log("Open:", open.length, "of", tickets.length);
 
console.log("\n── getTicketsByUrgency ───────────────────");
const highOnly = getTicketsByUrgency(tickets, "HIGH");
console.log("HIGH tickets:", highOnly.length);
highOnly.forEach((t) => console.log(" →", t.customer));
 
console.log("\n── formatAllTickets ──────────────────────");
formatAllTickets(tickets).forEach((label) => console.log(label));
 
console.log("\n── getTicketStats ────────────────────────");
console.log(getTicketStats(tickets));