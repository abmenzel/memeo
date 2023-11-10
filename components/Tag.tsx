import classNames from 'classnames'
import Tag from '../models/Tag'

type TagProps = React.HTMLAttributes<HTMLParagraphElement> & {
	tag: Tag
	className?: string
}

const Tag: React.FC<TagProps> = ({ tag, className, ...rest }) => {
	return (
		<p
			className={classNames(
				'btn-tag',
				'text-theme-dark',
				'text-opacity-70',
				'no-highlight',
				tag.color,
				className
			)}
			{...rest}>
			{tag.name}
		</p>
	)
}

export default Tag
