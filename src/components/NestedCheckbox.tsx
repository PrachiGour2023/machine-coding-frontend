import React, { useState } from 'react'

interface CheckboxState {
    id: number;
    label: string;
    children: CheckboxState[]
}

const CheckboxesData = [
    {
        id: 1,
        label: "Fruits",
        children: [
            { id: 2, label: "Apple" },
            { id: 3, label: "Banana" },
            {
                id: 4,
                label: "Citrus",
                children: [
                    { id: 5, label: "Orange" },
                    { id: 6, label: "Lemon" },
                ],
            },
        ],
    },
    {
        id: 7,
        label: "Vegetables",
        children: [
            { id: 8, label: "Carrot" },
            { id: 9, label: "Broccoli" },
        ],
    },
];

const CheckBoxes = ({ data, checked, setChecked }: any) => {

    

    const handleCheckedItem = (checked: boolean, node: any) => {
        setChecked(prev => {
            const newState = { ...prev, [node.id]: checked }

            const updateChildren = (node) => {
                if (node.children) {
                    node.children.forEach((child) => {
                        newState[child.id] = checked;
                        updateChildren(child)
                    })
                }
            }

            const updateParent = (node, data) => {
                const findParent = (nodeId, tree) => {
                    console.log(nodeId, "tree", tree);
                    for (let item of tree) {
                        if (item.children?.some((child) => child.id === nodeId)) {
                            return item;
                        }
                        const found = item.children && findParent(nodeId, item.children)
                        if (found) return found;
                    }
                    return null;
                }

                let parent = findParent(node.id, data)
                while (parent) {
                    const allChildrenChecked = parent.children.every(child => newState[child.id])
                    newState[parent.id] = allChildrenChecked;
                    parent = findParent(parent.id, data)
                }
            }


            updateChildren(node)
            updateParent(node, CheckboxesData)
            return newState;
        })
    }

    return (
        <div>
            {
                data.map((node: any) => {
                    return (
                        <div key={node.id} className='check-box-container'>
                            <input type="checkbox" checked={Boolean(checked?.[node?.id])} onChange={(e) => handleCheckedItem(e.target.checked, node)} />
                            <span>{node.label}</span>
                            {
                                node.children && (
                                    <CheckBoxes checked={checked} setChecked={setChecked} data={node.children} />
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

const NestedCheckbox = () => {

    const [checked, setChecked] = useState<any>({})

    return (
        <div>
            <h2>Nested Checkbox</h2>
            <CheckBoxes checked={checked} setChecked={setChecked} data={CheckboxesData} />
        </div>
    )
}

export default NestedCheckbox