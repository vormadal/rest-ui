import { ErrorComponent } from '../../core/app/ErrorComponent';
import { ComponentProps } from '../../lib/ComponentProps';

export default function DefaultErrorComponent({ context }: ComponentProps) {
  const config = context.config as ErrorComponent<React.FC<ComponentProps>>;
  return (
    <div>
      <h1>{config.spec.message}</h1>
    </div>
  );
}
