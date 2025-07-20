'use client';

import Image from 'next/image';
import { MeResponseDto } from '@/domain/dtos/auth.dto';
import Link from 'next/link';
interface SelectProfileListProps {
  profiles: MeResponseDto['profiles'];
}

export default function SelectProfileList({ profiles }: SelectProfileListProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {profiles?.map((p) => (
                <Link href="/movies" key={p.id}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded overflow-hidden border-2 border-transparent group-hover:border transition">
                        <Image
                            src={p.avatarUrl ?? '/default-avatar.jpg'}
                            alt={p.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm md:text-base group-hover:text-[#E50914] text-center block">
                        {p.name}
                    </span>
                </Link>
            ))}
        </div>
    );
}
