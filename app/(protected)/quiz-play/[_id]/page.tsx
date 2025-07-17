import {fetchQuizById} from '@/lib/actions';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    image: string;
}

interface Quiz {
    _id: string;
    title: string;
    description?: string;
    prize: number;
    timeRange?: string;
    correctPoints?: number;
    incorrectPoints?: number;
    entryFee?: number;
    category: Category;
}

interface PageProps {
    params: Promise<{ _id: string }>;
}

export default async function QuizPlayPage({params}: PageProps) {
    try {
        const {_id} = await params;
        const quiz: Quiz | null = await fetchQuizById(_id);

        if (!quiz) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
                        <p className="text-gray-400">The quiz you are looking for does not exist.</p>
                    </div>
                </div>
            );
        }

        const {
            title,
            prize,
            timeRange = '90-150 sec',
            correctPoints = 50,
            incorrectPoints = 25,
            category,
        } = quiz;

        const categoryImage =
            category?.image?.startsWith('data:image') && category.image
                ? category.image
                : '/default-category.png'; // fallback if needed

        return (
            <div className="flex justify-center text-white px-4 py-10">
                <div className="rounded-2xl h-fit p-6 w-full max-w-md shadow-xl border border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={categoryImage}
                            alt={`${category?.name || 'Category'} icon`}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="text-xs text-blue-400">{category?.name || 'General'}</div>
                            <div className="text-lg font-bold">
                                {title} 🪙 {prize}
                            </div>
                        </div>
                    </div>

                    <Link
                        href={`/quiz/${_id}`}
                        className="block text-center w-full bg-white text-black font-bold py-2 rounded-lg my-4 hover:bg-gray-200 transition"
                        aria-label={`Start ${title} quiz`}
                    >
                        PLAY
                    </Link>

                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>You have {timeRange} to answer all questions</li>
                        <li>Answer as many questions as you can</li>
                        <li>
                            For every correct answer:{' '}
                            <span className="text-green-400">+{correctPoints}</span> points,
                            wrong answer:{' '}
                            <span className="text-red-400">-{incorrectPoints}</span>
                        </li>
                        <li>You can use lifelines during the contest</li>
                        <li>Lifelines may cost coins or be free</li>
                    </ul>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                    <p className="text-gray-400">Please try again later.</p>
                </div>
            </div>
        );
    }
}
