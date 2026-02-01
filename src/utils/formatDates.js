export function formatDates(dates) {
    // dates are like "2017-07" / "2026-01" in your JSON :contentReference[oaicite:7]{index=7}
    const fmt = (v) => {
        if (!v) return ''
        const [y, m] = v.split('-')
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ]
        const mm = Number(m)
        return mm >= 1 && mm <= 12 ? `${monthNames[mm - 1]} ${y}` : v
    }
    return `${fmt(dates?.start)} – ${fmt(dates?.end)}`.trim()
}