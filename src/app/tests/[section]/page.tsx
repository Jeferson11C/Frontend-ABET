import { notFound } from 'next/navigation'
import { ChartsPage, ModalsDemoPage, PublicPage, TablesPage } from '@/modules/tests'

type Section = 'charts' | 'modals' | 'public' | 'tables'

type PageProps = {
    params: {
        section: Section
    }
}

const sectionMap: Record<Section, () => JSX.Element> = {
    charts: ChartsPage,
    modals: ModalsDemoPage,
    public: PublicPage,
    tables: TablesPage,
}

export default function TestsSectionPage({ params }: PageProps) {
    const Page = sectionMap[params.section]

    if (!Page) {
        notFound()
    }

    return <Page />
}
