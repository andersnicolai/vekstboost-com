import { CommonComponentProps } from '@/types'

// Gjør props obligatoriske i stedet for valgfrie
type RequiredCommonProps = Required<CommonComponentProps>

export function withCommonProps<P extends RequiredCommonProps>(
    WrappedComponent: React.ComponentType<P>
) {
    return function WithCommonPropsComponent(props: P) {
        return <WrappedComponent {...props} />
    }
} 