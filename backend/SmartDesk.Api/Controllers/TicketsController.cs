using Microsoft.AspNetCore.Mvc;
using SmartDesk.Api.Models;

namespace SmartDesk.Api.Controllers;

//[ApiController]=> Tells .NET: this is an API controller.
// Enables automatic request validation, model binding,
// and proper error responses. Always add this to API controllers.


[ApiController]

//[Route("api/[controller]")]=> Sets the URL prefix for all endpoints in this controller.
// [controller] = the class name minus "Controller".
// TicketsController → /api/tickets
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
private static List<Ticket> _tickets = new List<Ticket>
{
    new Ticket { Id = 10001, Customer = "Lars Nielsen", Email = "lars@example.com",
            Subject = "Front wheel is making a grinding noise",
            Status = "open", Urgency = "HIGH",
            CreatedAt = DateTime.UtcNow.AddDays(-3) },

        new Ticket { Id = 10002, Customer = "Sofia Berg", Email = "sofia@example.com",
            Subject = "Invoice shows wrong VAT amount",
            Status = "open", Urgency = "LOW",
            CreatedAt = DateTime.UtcNow.AddDays(-2) },

        new Ticket { Id = 10003, Customer = "Mikkel Holm", Email = "mikkel@example.com",
            Subject = "Battery not charging past 40 percent",
            Status = "resolved", Urgency = "MEDIUM",
            CreatedAt = DateTime.UtcNow.AddDays(-1) },
};

private static int _nextId= 1004;


    // [HttpGet]=> Tells .NET: this method handles GET requests to /api/tickets.
    // Returns all tickets as a JSON array.
    // IActionResult = the method can return different response types
[HttpGet]
public IActionResult GetAll()
{
    // Ok() returns HTTP 200 with the data as JSON.
    return Ok(_tickets);
}
 // This is a route parameter. /api/tickets/10001 sets id = 10001.
// .NET automatically extracts it and passes it to the method.
[HttpGet("{id}")]
public IActionResult GetById (int id)
{
    //FirstOrDefault=> Searches the list for a ticket with matching ID.
    // Returns the ticket if found, null if not found.
    var ticket = _tickets.FirstOrDefault(t=>t.Id==id);

    if (ticket==null) return NotFound();
    return Ok(ticket);
}
 
    //  [HttpPost] => Handles POST requests — creating a new ticket.
    // Called when a customer submits the form in React.
    [HttpPost]
    public IActionResult Create ([FromBody]Ticket ticket)
    {
        // .NET automatically validates the incoming data.
         // This is the server-side validation layer.
         // React validates first (client-side). .NET validates again (server-side).
         if (!ModelState.IsValid) return BadRequest (ModelState);

         // The server controls these to prevent manipulation.
         ticket.Id= _nextId++;
         ticket.CreatedAt =DateTime.UtcNow;

         _tickets.Add(ticket);

         // Returns HTTP 201 Created — the correct response for a new resource.
         return CreatedAtAction (nameof (GetById), new {id = ticket.Id}, ticket);
    }

     // PATCH /api/tickets/{id}
     // PATCH updates only specific fields — just the status here.
     [HttpPatch("{id}")]
     public IActionResult UpdateStatus (int id, [FromBody]UpdateStatusRequest request)
     {
        var ticket= _tickets.FirstOrDefault(t=>t.Id == id);
        if (ticket==null) return NotFound();

        ticket.Status=request.Status;
        return Ok(ticket);
     }

}

// PATCH only accepts { status: "resolved" } — not a full Ticket.
// This class defines exactly what the PATCH endpoint accepts.
// Sending extra fields = ignored. Missing status = validation error.

public class UpdateStatusRequest
{
    public required string Status {get;set;}
}