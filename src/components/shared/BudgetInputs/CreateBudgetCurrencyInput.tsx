"use client"

import { CreateBudgetInput, UpdateBudgetInput } from "@/validations/budget.validations";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { motion } from "motion/react";
import { InputError } from "../InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencies } from "@/constants/currencies.constants";
import { cn } from "cn";

interface ICreateBudgetCurrencyInput {
    control: Control<CreateBudgetInput>
    errors: FieldErrors<CreateBudgetInput | UpdateBudgetInput>
}

export function CreateBudgetCurrencyInput({ control, errors }: ICreateBudgetCurrencyInput) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
		>
			<label className='font-normal text-primary-text text-base' htmlFor='currency'>
				Currency
			</label>

			<Controller 
                control={control}
                name="currency"
                render={({field, fieldState}) => (
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            className={cn(
                                "w-full mt-0.5",
                                fieldState.invalid ? "border-error" : "border-border"
                            )}
                        >
                            <SelectValue placeholder="Select a currency"/>
                        </SelectTrigger>

                        <SelectContent>
                            {currencies.map((currency) => (
                                <SelectItem
                                    key={currency.value}
                                    value={currency.value}
                                >
                                    {currency.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />

			<InputError message={errors.currency?.message} />
		</motion.div>
	)
}
