'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
    id: string
    itemName: string
    deleteAction: (id: string) => Promise<{ error?: string; success?: boolean }>
}

export default function DeleteButton({ id, itemName, deleteAction }: DeleteButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleting(true)
        const result = await deleteAction(id)
        setIsDeleting(false)

        if (result.success) {
            setIsConfirming(false)
            router.refresh()
        } else {
            console.error('Failed to delete:', result.error)
            alert('Failed to delete item: ' + result.error)
        }
    }

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsConfirming(false)
    }

    const handleInitialClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsConfirming(true)
    }

    if (isConfirming) {
        return (
            <>
                <button
                    type="button"
                    className="group p-2 rounded-lg bg-red-500/10 transition-colors relative z-10"
                    title={`Delete ${itemName}`}
                    disabled
                >
                    <Trash2 className="w-4 h-4 text-red-500 transition-colors" />
                </button>

                {/* Fixed Overlay Modal - Guaranteed to show on top */}
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0f172a] border border-red-500/50 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white">Delete {itemName}?</h3>
                                <p className="text-sm text-gray-400">
                                    Are you sure you want to delete this {itemName.toLowerCase()}? This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full pt-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isDeleting}
                                    className="flex-1 py-2.5 px-4 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 py-2.5 px-4 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white transition-colors shadow-lg shadow-red-900/20 border border-red-500/20 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <span className="w-4 h-4 block animate-spin border-2 border-current border-t-transparent rounded-full" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <button
            type="button"
            onClick={handleInitialClick}
            className="group p-2 rounded-lg hover:bg-red-500/10 transition-colors relative z-10"
            title={`Delete ${itemName}`}
        >
            <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
        </button>
    )
}
