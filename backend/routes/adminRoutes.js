import { prisma } from "../utils/prisma.ts";
import dotenv from "dotenv";

dotenv.config();

export async function getUnapprovedUsers(req, res) {
    try {
        const unapprovedUsers = await prisma.user.findMany({
            where: { approved: false },

        })

        return res.status(200).json({ unapprovedUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "There was an internal server error"})
    }
};

export async function approveUser(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "User ID not provided"});
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id)},
            data: { approved: true }
        })

        return res.status(200).json({ message: "User approved successfylly", user: {id: user.id, first_name: user.first_name, last_name: user.last_name, approved: user.approved}});

    } catch (error) {
        console.log(error);

        if (error.code === "P2025") {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(500).json({error: "There was an internal server error"})
    }
};