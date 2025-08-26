import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { memo } from 'react';

type IconName = keyof typeof LucideIcons

type LucideIconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>

interface DynamicIconProps {
  name: IconName
  size?: number
  color?: string
  className?: string
}

const DynamicIcon = memo(({
  name,
  size = 24,
  color,
  className,
}: DynamicIconProps) => {

  const Icon = LucideIcons[name] as LucideIconComponent

  return <Icon size={size} color={color} className={className} />
})

export default DynamicIcon