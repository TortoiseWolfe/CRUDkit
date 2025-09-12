'use client';

import Link from 'next/link';
import Text from '@/components/subatomic/Text/Text';
import Dice from '@/components/atomic/Dice/Dice';
import DiceTray from '@/components/atomic/DiceTray/DiceTray';

export default function ComponentsPage() {
  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/" className="btn btn-ghost btn-sm">
            ← Back to Home
          </Link>
        </div>
        <Text variant="h1" className="mb-8 text-center">
          Component Gallery
        </Text>
        <Text variant="lead" className="text-base-content/70 mb-12 text-center">
          Interactive atomic components showcase
        </Text>

        {/* Text Component Showcase */}
        <section className="mb-16">
          <Text variant="h2" className="mb-6">
            Text Component
          </Text>

          <div className="space-y-4">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <Text variant="h3" className="mb-4">
                  Typography Variants
                </Text>

                <div className="space-y-4">
                  <Text variant="h1">Heading 1</Text>
                  <Text variant="h2">Heading 2</Text>
                  <Text variant="h3">Heading 3</Text>
                  <Text variant="h4">Heading 4</Text>
                  <Text variant="h5">Heading 5</Text>
                  <Text variant="h6">Heading 6</Text>
                  <Text variant="lead">Lead paragraph text for emphasis</Text>
                  <Text variant="body">
                    Body text for regular content. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </Text>
                  <Text variant="small">
                    Small text for secondary information
                  </Text>
                  <Text variant="code">
                    const example = &quot;code text&quot;;
                  </Text>
                  <Text variant="emphasis">
                    Emphasized text for special attention
                  </Text>
                  <Text variant="caption">Caption text for descriptions</Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dice Component Showcase */}
        <section className="mb-16">
          <Text variant="h2" className="mb-6">
            Dice Component
          </Text>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Text variant="h4" className="mb-4">
                D6 Dice
              </Text>
              <Dice sides={6} />
            </div>
            <div>
              <Text variant="h4" className="mb-4">
                D20 Dice
              </Text>
              <Dice sides={20} />
            </div>
          </div>
        </section>

        {/* Dice Tray Component Showcase */}
        <section className="mb-16">
          <Text variant="h2" className="mb-6">
            Dice Tray Component
          </Text>

          <div className="space-y-6">
            <DiceTray numberOfDice={5} sides={6} />

            <Text variant="h4" className="mt-8 mb-4">
              D20 Dice Tray
            </Text>
            <DiceTray numberOfDice={3} sides={20} />
          </div>
        </section>

        <section>
          <Text variant="h2" className="mb-4">
            Next Steps
          </Text>
          <Text variant="body">
            Build more atomic components following the same pattern as the Text,
            Dice, and DiceTray components.
          </Text>
        </section>
      </div>
    </main>
  );
}
