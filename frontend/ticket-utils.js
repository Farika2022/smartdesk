// SmartDesk — ticket utilities

// --- VARIABLES ---
const URGENCY_LEVELS = ["LOW", "MEDIUM", "HIGH"];
const MAX_SUBJECT_LENGTH = 100;

// --- FUNCTIONS ---
function createTicket(customerName,email,subject){
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
const getUrgencyLevel = (score)=>{
    if (score >80)return "HIGH";
    if (score >40) return "MEDIUM";
    return "LOW";
};

const formatTicketLabel =(ticket)=>{
    return "[" + ticket.urgency + "#" + ticket.id +"-"+ ticket.subject + "]";

};

// --- TEST
const myTicket = createTicket("Farika","Farika@test.com","Walker wheelchair broken");
console.log(myTicket);
console.log (getUrgencyLevel(85));
console.log (formatTicketLabel(myTicket));