"use client"

import { UserSettings } from '@prisma/client';
import React from 'react'

interface Props {
    userSettings: UserSettings;
    from: Date;
    to: Date;
  }

export default function CategoriesStats({ userSettings, from, to }: Props) {
  return (
    <div>CategoriesStats</div>
  )
}
