import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { nilai } = usePage().props;

    return (
        <div>
            hello world {nilai}
        </div>
    );
}