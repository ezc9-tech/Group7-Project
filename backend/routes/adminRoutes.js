import { prisma } from "../utils/prisma.ts";
import dotenv from "dotenv";

dotenv.config();

export async function approveUser(req, res) {
    try {
        const { id } = req.params;

        const user = await prisma.user.update({
            where: { id: parseInt(id)},
            data: { approved: true }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        return res.status(200).json({ message: "User approved successfylly", user: {id: user.id, first_name: user.first_name, last_name: user.last_name, approved: user.approved}});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "There was an internal server error"})
    }
};