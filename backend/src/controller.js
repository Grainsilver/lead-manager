import prisma from "./prisma.js";

// Valid enum values
const VALID_STATUSES = [
  "New",
  "Engaged",
  "ProposalSent",
  "ClosedWon",
  "ClosedLost",
];

// Basic email shape check — not RFC-perfect, but catches obvious garbage.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /return all leads, newest first
export async function getLeads(req, res) {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(leads);
  } catch (err) {
    console.error("getLeads error:", err);
    res.status(500).json({ error: "Failed to fetch leads." });
  }
}

// POST /create a new lead
export async function createLead(req, res) {
  try {
    const { name, email, status } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${VALID_STATUSES.join(", ")}.`,
      });
    }

    //  Create
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        ...(status && { status }),
      },
    });

    res.status(201).json(lead);
  } catch (err) {
    // duplicate email
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A lead with this email already exists." });
    }
    console.error("createLead error:", err);
    res.status(500).json({ error: "Failed to create lead." });
  }
}