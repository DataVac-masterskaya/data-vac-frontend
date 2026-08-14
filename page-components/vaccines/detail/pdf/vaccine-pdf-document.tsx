import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { VaccinePdfData } from './vaccine-pdf.types'
import { pdfStyles as s } from './vaccine-pdf.styles'

type Props = {
  data: VaccinePdfData
  qrImages?: { specialist?: string; nonspec?: string }
}

function Section({
  title,
  children,
  wrap = true,
}: {
  title: string
  children: ReactNode
  wrap?: boolean
}) {
  return (
    <View wrap={wrap}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function StatusBadge({
  tone,
  symbol,
  children,
}: {
  tone: 'danger' | 'warn' | 'ok'
  symbol: string
  children: ReactNode
}) {
  const iconStyle =
    tone === 'danger' ? s.statusIconDanger : tone === 'warn' ? s.statusIconWarn : s.statusIconOk

  return (
    <View style={s.statusRow}>
      <View style={iconStyle}>
        <Text style={s.statusIconText}>{symbol}</Text>
      </View>
      <View style={s.statusValueWrap}>{children}</View>
    </View>
  )
}

function QrSlot({ src, label }: { src: string; label: string }) {
  return (
    <View style={s.qrItem}>
      <Image src={src} style={s.qrImage} />
      <Text style={s.qrLabel}>{label}</Text>
    </View>
  )
}

export function VaccinePdfDocument({ data, qrImages }: Props) {
  const hasQr = Boolean(qrImages?.specialist || qrImages?.nonspec)
  const ingredients = data.ingredients ?? []
  const storageLines = data.storageLines ?? []
  const administrationMethods = data.administrationMethods ?? []
  const contraindicationGroups = data.contraindicationGroups ?? []
  const instructionSections = data.instructionSections ?? []
  const infections = data.infections ?? []

  const hasTwoCol =
    ingredients.length > 0 ||
    storageLines.length > 0 ||
    Boolean(data.interactionInfo) ||
    Boolean(data.pregnancyLabel) ||
    Boolean(data.compatibilityInfo)

  return (
    <Document title={data.name}>
      <Page size="A4" style={s.page}>
        <View style={s.header} wrap={false}>
          <View style={s.brandBlock}>
            <Image src={data.logoSrc} style={s.logo} />
            <Text style={s.brandSubtitle}>
              {`Структурированная информация с сайта\nГосударственного реестра лекарственных средств`}
            </Text>
          </View>

          {hasQr ? (
            <View style={s.qrHeader}>
              <Text style={s.qrCaption}>Ссылка на версию инструкции для:</Text>
              <View style={s.qrBlock}>
                {qrImages?.specialist ? (
                  <QrSlot src={qrImages.specialist} label="Специалистов" />
                ) : null}
                {qrImages?.nonspec ? (
                  <QrSlot src={qrImages.nonspec} label="Неспециалистов" />
                ) : null}
              </View>
            </View>
          ) : null}
        </View>

        <View style={s.nameBlock} wrap={false}>
          <Text style={s.h1}>{data.name}</Text>

          {data.officialName ? (
            <View>
              <View style={s.officialNameLabelWrap}>
                <Text style={s.sectionHeading}>Полное название вакцины</Text>
              </View>
              <Text style={s.officialName}>{data.officialName}</Text>
            </View>
          ) : null}
        </View>

        {infections.length > 0 || data.ageAllowed ? (
          <View style={s.twoColRow}>
            <View style={s.twoColLeft}>
              {infections.length > 0 ? (
                <View>
                  <Text style={s.sectionHeading}>Инфекции</Text>
                  <Text style={s.infectionsValue}>{infections.join(', ')}</Text>
                </View>
              ) : null}
            </View>
            <View style={s.twoColRight}>
              {data.ageAllowed ? (
                <View>
                  <Text style={s.sectionHeading}>Допустимый возраст</Text>
                  <Text style={s.ageValue}>{data.ageAllowed}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        {administrationMethods.length > 0 ? (
          <View style={s.methodsSection}>
            <Text style={s.sectionHeading}>Способ введения</Text>
            <View style={s.methodsRow}>
              {administrationMethods.map((m, i) => (
                <View
                  key={`${m.title}-${i}`}
                  style={i % 3 === 2 ? s.methodCardLast : s.methodCard}
                  wrap={false}
                >
                  <Text style={s.methodTitle}>{m.title}</Text>
                  <Image src={m.imageSrc} style={s.methodImage} />
                  {m.ageGroup ? <Text style={s.methodAge}>{m.ageGroup}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {contraindicationGroups.length > 0 ? (
          <View style={s.contraSection}>
            <Text style={s.sectionHeading}>Противопоказания</Text>
            {contraindicationGroups.map((group) => (
              <View key={group.label}>
                <Text style={s.contraGroupLabel}>{group.label}</Text>
                {(group.items ?? []).map((name) => (
                  <Text key={name} style={s.contraName}>
                    {name}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {hasTwoCol ? (
          <View style={s.infoSection}>
            <View style={s.infoRow}>
              <View style={s.infoColLeft}>
                {ingredients.length > 0 ? (
                  <View style={s.infoBlock}>
                    <Text style={s.infoBlockHeading}>Состав</Text>
                    {ingredients.map((g) => (
                      <View key={g.role}>
                        <Text style={s.roleLabel}>{g.role}</Text>
                        {(g.names ?? []).map((n) => (
                          <Text key={n} style={s.infoValue}>
                            {n}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                ) : null}
                {storageLines.length > 0 ? (
                  <View style={ingredients.length > 0 ? s.infoBlockSpaced : s.infoBlock}>
                    <Text style={s.infoBlockHeading}>Хранение</Text>
                    {storageLines.map((line) => (
                      <Text key={line} style={s.storageLine}>
                        — {line}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              <View style={s.infoColRight}>
                {data.interactionInfo ? (
                  <View style={s.infoBlock}>
                    <Text style={s.infoBlockHeading}>Взаимодействие с препаратами</Text>
                    <StatusBadge tone="danger" symbol="×">
                      <Text style={s.statusValue}>{data.interactionInfo}</Text>
                    </StatusBadge>
                  </View>
                ) : null}
                {data.pregnancyLabel ? (
                  <View
                    style={
                      data.interactionInfo ? s.infoBlockSpaced : s.infoBlock
                    }
                  >
                    <Text style={s.infoBlockHeading}>
                      Применение при беременности и грудном вскармливании
                    </Text>
                    <StatusBadge
                      tone={data.pregnancyCaution ? 'warn' : 'ok'}
                      symbol={data.pregnancyCaution ? '!' : '✓'}
                    >
                      <Text style={s.statusValue}>{data.pregnancyLabel}</Text>
                    </StatusBadge>
                  </View>
                ) : null}
                {data.compatibilityInfo ? (
                  <View
                    style={
                      data.interactionInfo || data.pregnancyLabel
                        ? s.infoBlockSpaced
                        : s.infoBlock
                    }
                  >
                    <Text style={s.infoBlockHeading}>
                      Одновременное введение с другими вакцинами
                    </Text>
                    <StatusBadge tone="ok" symbol="✓">
                      <Text style={s.statusValue}>{data.compatibilityInfo}</Text>
                    </StatusBadge>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        {instructionSections.length > 0 ? (
          <View>
            <View style={s.divider}>
              <Text style={s.dividerText}>Информация из инструкции:</Text>
            </View>
            {instructionSections.map((sec) => (
              <Section key={sec.title} title={sec.title}>
                {Array.isArray(sec.content) ? (
                  sec.content.map((line) => (
                    <Text key={line} style={s.text}>
                      • {line}
                    </Text>
                  ))
                ) : (
                  <Text style={s.text}>{sec.content}</Text>
                )}
              </Section>
            ))}
          </View>
        ) : null}

        {data.orgComment ? (
          <View style={s.commentBox}>
            <Text style={s.commentTitle}>Комментарий АНО «Коллективный иммунитет»:</Text>
            <Text style={s.commentBody}>{data.orgComment}</Text>
          </View>
        ) : null}

        {data.revisionDate ? (
          <Text style={s.revisionDate}>Дата последней ревизии: {data.revisionDate}.</Text>
        ) : null}

        <Text style={s.footer} render={({ pageNumber }) => `стр. ${pageNumber}`} fixed />
      </Page>
    </Document>
  )
}
