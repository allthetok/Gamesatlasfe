const ratingFloatToStar = (rating: number) : number => rating / 20

const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })

const formattedYear = (inpDate: string) => new Date(inpDate).getFullYear()

export { ratingFloatToStar, formattedDateLong, formattedYear }