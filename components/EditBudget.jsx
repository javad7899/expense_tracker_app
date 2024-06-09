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
import { Button } from "./ui/button"
import { PenBox } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { db } from "@/utils/dbConfig"
import { Budgets } from "@/utils/schema"
import { toast } from "sonner"
import { eq } from "drizzle-orm"

const EditBudget = ({ budgetInfo, refreshData }) => {
    const [emojiIcon, setEmojiIcon] = useState()
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")

    useEffect(() => {
        setEmojiIcon(budgetInfo?.emoji)
        setAmount(budgetInfo?.amount)
        setName(budgetInfo?.name)
    }, [budgetInfo])


    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id)).returning()
        setName("")
        setAmount("")
        if (result) {
            refreshData()
            toast("Budget Edited!")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> <PenBox className="mr-2" /> Edit Budget</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Budget</DialogTitle>
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
                                <Input placaholder="e.g. Home Decor" defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="mt-5">
                                <h2 className="my-2 font-medium">Budget Amount</h2>
                                <Input placaholder="e.g. 5000$" type="number" defaultValue={budgetInfo?.amount} onChange={(e) => setAmount(e.target.value)} value={amount} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button disabled={!(name && amount)} onClick={() => onUpdateBudget()} className="w-full mt-5">Edit Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditBudget