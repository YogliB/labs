import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from '../progress-bar.js';

describe('ProgressBar', () => {
	it('renders progress bar with all information', () => {
		const { lastFrame } = render(
			<ProgressBar current={5} total={10} branch="main" elapsed={30} />,
		);

		const output = lastFrame();
		expect(output).toContain('5/10');
		expect(output).toContain('50%');
		expect(output).toContain('main');
		expect(output).toContain('0:30');
	});

	it('displays correct percentage', () => {
		const { lastFrame } = render(
			<ProgressBar current={1} total={4} branch="feature" elapsed={0} />,
		);

		const output = lastFrame();
		expect(output).toContain('25%');
	});

	it('displays 100 percent when completed', () => {
		const { lastFrame } = render(
			<ProgressBar
				current={10}
				total={10}
				branch="develop"
				elapsed={60}
			/>,
		);

		const output = lastFrame();
		expect(output).toContain('10/10');
		expect(output).toContain('100%');
	});

	it('displays 0 percent at start', () => {
		const { lastFrame } = render(
			<ProgressBar current={0} total={100} branch="test" elapsed={0} />,
		);

		const output = lastFrame();
		expect(output).toContain('0/100');
		expect(output).toContain('0%');
	});

	it('formats elapsed time correctly with minutes and seconds', () => {
		const { lastFrame } = render(
			<ProgressBar current={5} total={10} branch="main" elapsed={90} />,
		);

		const output = lastFrame();
		expect(output).toContain('1:30');
	});

	it('formats elapsed time with zero-padded seconds', () => {
		const { lastFrame } = render(
			<ProgressBar current={5} total={10} branch="main" elapsed={5} />,
		);

		const output = lastFrame();
		expect(output).toContain('0:05');
	});

	it('displays branch name correctly', () => {
		const { lastFrame } = render(
			<ProgressBar
				current={3}
				total={10}
				branch="feature/my-branch"
				elapsed={0}
			/>,
		);

		const output = lastFrame();
		expect(output).toContain('feature/my-branch');
	});

	it('renders progress bar with filled and empty portions', () => {
		const { lastFrame } = render(
			<ProgressBar current={2} total={10} branch="main" elapsed={0} />,
		);

		const output = lastFrame();
		expect(output).toContain('█');
		expect(output).toContain('░');
	});

	it('calculates bar width correctly for 50% progress', () => {
		const { lastFrame } = render(
			<ProgressBar current={5} total={10} branch="main" elapsed={0} />,
		);

		const output = lastFrame();
		expect(output).toMatch(/\[█{10}░{10}\]/);
	});

	it('handles large elapsed times with hours worth of seconds', () => {
		const { lastFrame } = render(
			<ProgressBar current={5} total={10} branch="main" elapsed={3661} />,
		);

		const output = lastFrame();
		expect(output).toContain('61:01');
	});
});
