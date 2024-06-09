"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { db } from "@/utils/dbConfig"
import { Budgets } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"


const CreateBudget = ({ refreshData }) => {
    const [emojiIcon, setEmojiIcon] = useState("🙂")
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const { user } = useUser()

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets).values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon
        }).returning({ insertedId: Budgets.id })
        if (result) {
            refreshData()
            toast("New Budget Created!")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-slate-100 p-10 flex gap-2 items-center justify-center rounded-md border-2 border-dashed hover:shadow-md cursor-pointer h-40">
                    <h2 className="text-xl font-bold">+ Create New Budget</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                        <div className="mt-5">
                            <Button variant="outline" className="text-xl" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                            <div className="absolute z-10">
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false)
                                }} />
                            </div>
                            <div className="mt-5">
                                <h2 className="my-2 font-medium">Budget Name</h2>
                                <Input placaholder="e.g. Home Decor" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mt-5">
                                <h2 className="my-2 font-medium">Budget Amount</h2>
                                <Input placaholder="e.g. 5000$" type="number" onChange={(e) => setAmount(e.target.value)} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className="w-full mt-5">Create Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBudget